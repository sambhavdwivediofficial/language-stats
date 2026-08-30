import * as vscode from "vscode";
import { detectLanguage } from "./languageMap";

export interface LanguageStat {
  name: string;
  color: string;
  bytes: number;
  fileCount: number;
  percentage: number;
}

export interface AnalysisResult {
  totalFiles: number;
  totalFolders: number;
  totalCodeBytes: number;
  languages: LanguageStat[]; // code only -> used for bar + %
  assets: LanguageStat[];    // images/video/audio/docs/etc -> count only, no bar, no %
}

const EXCLUDE_GLOB =
  "**/{node_modules,.git,dist,build,out,.vscode,.idea,coverage,target,bin,obj,.next,.nuxt,venv,__pycache__,.gradle}/**";

export async function analyzeWorkspace(): Promise<AnalysisResult> {
  const files = await vscode.workspace.findFiles("**/*", EXCLUDE_GLOB);

  const codeMap = new Map<string, LanguageStat>();
  const assetMap = new Map<string, LanguageStat>();
  const folderSet = new Set<string>();

  let totalCodeBytes = 0;
  let totalFiles = 0;

  for (const file of files) {
    const info = detectLanguage(file.fsPath);
    if (!info) continue; // .lock, .map, .db, .log -> real noise, always skipped

    totalFiles += 1;

    const rel = vscode.workspace.asRelativePath(file, false);
    const parts = rel.split(/[\\/]/).slice(0, -1);
    let pathAcc = "";
    for (const part of parts) {
      pathAcc = pathAcc ? `${pathAcc}/${part}` : part;
      folderSet.add(pathAcc);
    }

    if (info.isCode) {
      // Code files -> counted by bytes, contributes to the % bar
      let size = 0;
      try {
        const stat = await vscode.workspace.fs.stat(file);
        size = stat.size;
      } catch {
        continue;
      }
      totalCodeBytes += size;

      const existing = codeMap.get(info.name);
      if (existing) {
        existing.bytes += size;
        existing.fileCount += 1;
      } else {
        codeMap.set(info.name, {
          name: info.name,
          color: info.color,
          bytes: size,
          fileCount: 1,
          percentage: 0,
        });
      }
    } else {
      // Images/Video/Audio/Documents/Fonts/Archives/Executables/Other
      // -> count only, size is NEVER used, so a big video/image can't skew anything
      const existing = assetMap.get(info.name);
      if (existing) {
        existing.fileCount += 1;
      } else {
        assetMap.set(info.name, {
          name: info.name,
          color: info.color,
          bytes: 0,
          fileCount: 1,
          percentage: 0,
        });
      }
    }
  }

  const languages = Array.from(codeMap.values());
  for (const lang of languages) {
    lang.percentage = totalCodeBytes > 0 ? (lang.bytes / totalCodeBytes) * 100 : 0;
  }
  languages.sort((a, b) => b.bytes - a.bytes);

  const assets = Array.from(assetMap.values());
  // "Other" always pinned last among assets; rest sorted by file count
  assets.sort((a, b) => {
    if (a.name === "Other") return 1;
    if (b.name === "Other") return -1;
    return b.fileCount - a.fileCount;
  });

  return {
    totalFiles,
    totalFolders: folderSet.size,
    totalCodeBytes,
    languages,
    assets,
  };
}
