export interface LanguageInfo {
  name: string;
  color: string;
  isCode: boolean;
}

// ---------- Code languages ----------
const RAW_LANGUAGE_MAP: Record<string, { name: string; color: string }> = {
  // Web
  ".html": { name: "HTML", color: "#e34c26" },
  ".htm": { name: "HTML", color: "#e34c26" },
  ".css": { name: "CSS", color: "#563d7c" },
  ".scss": { name: "SCSS", color: "#c6538c" },
  ".sass": { name: "Sass", color: "#a53b70" },
  ".less": { name: "Less", color: "#1d365d" },
  ".styl": { name: "Stylus", color: "#ff6347" },
  ".js": { name: "JavaScript", color: "#f1e05a" },
  ".mjs": { name: "JavaScript", color: "#f1e05a" },
  ".cjs": { name: "JavaScript", color: "#f1e05a" },
  ".jsx": { name: "JavaScript", color: "#f1e05a" },
  ".ts": { name: "TypeScript", color: "#3178c6" },
  ".tsx": { name: "TypeScript", color: "#3178c6" },
  ".vue": { name: "Vue", color: "#41b883" },
  ".svelte": { name: "Svelte", color: "#ff3e00" },
  ".astro": { name: "Astro", color: "#ff5a03" },

  // Data / Config
  ".json": { name: "JSON", color: "#292929" },
  ".jsonc": { name: "JSON", color: "#292929" },
  ".json5": { name: "JSON", color: "#292929" },
  ".yml": { name: "YAML", color: "#cb171e" },
  ".yaml": { name: "YAML", color: "#cb171e" },
  ".xml": { name: "XML", color: "#0060ac" },
  ".toml": { name: "TOML", color: "#9c4221" },
  ".ini": { name: "INI", color: "#6d8086" },
  ".cfg": { name: "INI", color: "#6d8086" },
  ".conf": { name: "INI", color: "#6d8086" },
  ".env": { name: "Env", color: "#8dd6f9" },
  ".csv": { name: "CSV", color: "#237346" },
  ".tsv": { name: "CSV", color: "#237346" },
  ".properties": { name: "Properties", color: "#4a5568" },

  // Backend languages
  ".py": { name: "Python", color: "#3572A5" },
  ".pyw": { name: "Python", color: "#3572A5" },
  ".ipynb": { name: "Jupyter Notebook", color: "#DA5B0B" },
  ".java": { name: "Java", color: "#b07219" },
  ".kt": { name: "Kotlin", color: "#A97BFF" },
  ".kts": { name: "Kotlin", color: "#A97BFF" },
  ".c": { name: "C", color: "#555555" },
  ".h": { name: "C", color: "#555555" },
  ".cpp": { name: "C++", color: "#f34b7d" },
  ".cc": { name: "C++", color: "#f34b7d" },
  ".cxx": { name: "C++", color: "#f34b7d" },
  ".hpp": { name: "C++", color: "#f34b7d" },
  ".cs": { name: "C#", color: "#178600" },
  ".go": { name: "Go", color: "#00ADD8" },
  ".rs": { name: "Rust", color: "#dea584" },
  ".php": { name: "PHP", color: "#4F5D95" },
  ".rb": { name: "Ruby", color: "#701516" },
  ".erb": { name: "Ruby", color: "#701516" },
  ".swift": { name: "Swift", color: "#F05138" },
  ".m": { name: "Objective-C", color: "#438eff" },
  ".mm": { name: "Objective-C++", color: "#6866fb" },
  ".scala": { name: "Scala", color: "#c22d40" },
  ".dart": { name: "Dart", color: "#00B4AB" },
  ".lua": { name: "Lua", color: "#000080" },
  ".pl": { name: "Perl", color: "#0298c3" },
  ".pm": { name: "Perl", color: "#0298c3" },
  ".r": { name: "R", color: "#198CE7" },
  ".jl": { name: "Julia", color: "#a270ba" },
  ".ex": { name: "Elixir", color: "#6e4a7e" },
  ".exs": { name: "Elixir", color: "#6e4a7e" },
  ".erl": { name: "Erlang", color: "#B83998" },
  ".hs": { name: "Haskell", color: "#5e5086" },
  ".clj": { name: "Clojure", color: "#db5855" },
  ".cljs": { name: "ClojureScript", color: "#db5855" },
  ".groovy": { name: "Groovy", color: "#4298b8" },
  ".zig": { name: "Zig", color: "#ec915c" },
  ".nim": { name: "Nim", color: "#ffc200" },
  ".v": { name: "V", color: "#4f87c4" },
  ".sol": { name: "Solidity", color: "#AA6746" },
  ".cob": { name: "COBOL", color: "#005ca5" },
  ".cbl": { name: "COBOL", color: "#005ca5" },
  ".f": { name: "Fortran", color: "#4d41b1" },
  ".f90": { name: "Fortran", color: "#4d41b1" },
  ".for": { name: "Fortran", color: "#4d41b1" },
  ".ada": { name: "Ada", color: "#02f88c" },
  ".adb": { name: "Ada", color: "#02f88c" },
  ".pro": { name: "Prolog", color: "#74283c" },
  ".scm": { name: "Scheme", color: "#1e4aec" },
  ".lisp": { name: "Common Lisp", color: "#3fb68b" },
  ".el": { name: "Emacs Lisp", color: "#c065db" },
  ".rkt": { name: "Racket", color: "#3c5caa" },
  ".ml": { name: "OCaml", color: "#3be133" },
  ".fs": { name: "F#", color: "#b845fc" },
  ".elm": { name: "Elm", color: "#60B5CC" },
  ".coffee": { name: "CoffeeScript", color: "#244776" },
  ".d": { name: "D", color: "#ba595e" },
  ".pas": { name: "Pascal", color: "#E3F171" },
  ".vb": { name: "Visual Basic", color: "#945db7" },
  ".vbs": { name: "VBScript", color: "#15dcdc" },
  ".matlab": { name: "MATLAB", color: "#e16737" },
  ".m4": { name: "M4", color: "#c4a1a1" },

  // Assembly / low-level
  ".asm": { name: "Assembly", color: "#6E4C13" },
  ".s": { name: "Assembly", color: "#6E4C13" },
  ".nasm": { name: "Assembly", color: "#6E4C13" },

  // Hardware description
  ".vhdl": { name: "VHDL", color: "#adb2cb" },
  ".vhd": { name: "VHDL", color: "#adb2cb" },
  ".verilog": { name: "Verilog", color: "#b2b7f8" },
  ".sv": { name: "SystemVerilog", color: "#dae1c2" },

  // Shell / Scripting
  ".sh": { name: "Shell", color: "#89e051" },
  ".bash": { name: "Shell", color: "#89e051" },
  ".zsh": { name: "Shell", color: "#89e051" },
  ".fish": { name: "Fish Shell", color: "#4aae47" },
  ".ps1": { name: "PowerShell", color: "#012456" },
  ".bat": { name: "Batch", color: "#C1F12E" },
  ".cmd": { name: "Batch", color: "#C1F12E" },
  ".awk": { name: "AWK", color: "#c30e9b" },

  // Database / Query languages
  ".sql": { name: "SQL", color: "#e38c00" },
  ".psql": { name: "PL/pgSQL", color: "#336790" },
  ".plsql": { name: "PL/SQL", color: "#dad8d8" },
  ".pgsql": { name: "PL/pgSQL", color: "#336790" },
  ".prisma": { name: "Prisma", color: "#0c344b" },
  ".cql": { name: "Cassandra CQL", color: "#1287b1" },
  ".hql": { name: "HiveQL", color: "#ffca28" },
  ".graphql": { name: "GraphQL", color: "#e10098" },
  ".gql": { name: "GraphQL", color: "#e10098" },

  // Mobile / build
  ".gradle": { name: "Gradle", color: "#02303a" },

  // Docs (text-based markup, not binary docs)
  ".md": { name: "Markdown", color: "#083fa1" },
  ".mdx": { name: "Markdown", color: "#083fa1" },
  ".rst": { name: "reStructuredText", color: "#141414" },
  ".tex": { name: "TeX", color: "#3D6117" },
  ".adoc": { name: "AsciiDoc", color: "#73a0c5" },

  // Infra / DevOps
  ".dockerfile": { name: "Dockerfile", color: "#384d54" },
  ".tf": { name: "Terraform", color: "#5c4ee5" },
  ".hcl": { name: "HCL", color: "#844FBA" },
  ".proto": { name: "Protocol Buffers", color: "#e535ab" },
  ".nginx": { name: "Nginx", color: "#009639" },

  // Functional / others
  ".purs": { name: "PureScript", color: "#1D222D" },
  ".re": { name: "Reason", color: "#ff5847" },
};

// ---------- Non-code asset categories (count-only, never affect % bar) ----------
const IMAGE_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico", ".webp", ".avif",
  ".tiff", ".tif", ".heic", ".raw", ".psd", ".ai", ".svg",
]);

const VIDEO_EXT = new Set([
  ".mp4", ".mov", ".avi", ".mkv", ".webm", ".flv", ".wmv", ".m4v", ".mpeg", ".mpg",
]);

const AUDIO_EXT = new Set([
  ".mp3", ".wav", ".flac", ".ogg", ".aac", ".wma", ".m4a", ".opus",
]);

const DOCUMENT_EXT = new Set([
  ".pdf",
  ".doc", ".docx", ".odt", ".rtf",
  ".ppt", ".pptx", ".odp", ".key",
  ".xls", ".xlsx", ".ods",
]);

const FONT_EXT = new Set([
  ".woff", ".woff2", ".ttf", ".otf", ".eot",
]);

const ARCHIVE_EXT = new Set([
  ".zip", ".rar", ".7z", ".tar", ".gz", ".bz2", ".xz", ".iso",
]);

const EXECUTABLE_EXT = new Set([
  ".exe", ".dll", ".so", ".dylib", ".bin", ".class", ".jar", ".pyc", ".msi", ".apk", ".app",
]);

const CATEGORY_COLORS: Record<string, string> = {
  Images: "#a074c4",
  Video: "#e0507d",
  Audio: "#37a779",
  Documents: "#4a90d9",
  Fonts: "#d9a441",
  Archives: "#8d8d8d",
  Executables: "#5c5c5c",
  Other: "#8a8a8a",
};

// Truly meaningless files — never counted anywhere
const IGNORE_EXT = new Set([
  ".lock", ".map", ".sqlite", ".sqlite3", ".db", ".log",
]);

export function detectLanguage(fileName: string): LanguageInfo | null {
  const lower = fileName.toLowerCase();

  if (lower.endsWith("dockerfile")) {
    return { name: "Dockerfile", color: "#384d54", isCode: true };
  }
  if (lower.endsWith("makefile")) {
    return { name: "Makefile", color: "#427819", isCode: true };
  }

  const dotIndex = lower.lastIndexOf(".");
  if (dotIndex === -1) return null;

  const ext = lower.substring(dotIndex);

  if (RAW_LANGUAGE_MAP[ext]) {
    return { ...RAW_LANGUAGE_MAP[ext], isCode: true };
  }

  if (IGNORE_EXT.has(ext)) return null;

  if (IMAGE_EXT.has(ext)) return { name: "Images", color: CATEGORY_COLORS.Images, isCode: false };
  if (VIDEO_EXT.has(ext)) return { name: "Video", color: CATEGORY_COLORS.Video, isCode: false };
  if (AUDIO_EXT.has(ext)) return { name: "Audio", color: CATEGORY_COLORS.Audio, isCode: false };
  if (DOCUMENT_EXT.has(ext)) return { name: "Documents", color: CATEGORY_COLORS.Documents, isCode: false };
  if (FONT_EXT.has(ext)) return { name: "Fonts", color: CATEGORY_COLORS.Fonts, isCode: false };
  if (ARCHIVE_EXT.has(ext)) return { name: "Archives", color: CATEGORY_COLORS.Archives, isCode: false };
  if (EXECUTABLE_EXT.has(ext)) return { name: "Executables", color: CATEGORY_COLORS.Executables, isCode: false };

  return { name: "Other", color: CATEGORY_COLORS.Other, isCode: false };
}
