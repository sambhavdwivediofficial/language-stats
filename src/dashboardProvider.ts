import * as vscode from "vscode";
import { analyzeWorkspace, AnalysisResult } from "./analyzer";

export class DashboardProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "languageStats.dashboard";
  private _view?: vscode.WebviewView;

  constructor(private readonly extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;
    webviewView.webview.options = { enableScripts: true };
    this.refresh();
  }

  public async refresh() {
    if (!this._view) return;
    this._view.webview.html = this.renderLoading();
    const result = await analyzeWorkspace();
    this._view.webview.html = this.renderDashboard(result);
  }

  private renderLoading(): string {
    return `<html><body style="font-family:sans-serif;padding:16px;color:#ccc;">Scanning workspace...</body></html>`;
  }

  private renderDashboard(result: AnalysisResult): string {
    const hasCode = result.languages.length > 0;
    const hasAssets = result.assets.length > 0;

    if (!hasCode && !hasAssets) {
      return `<html><body style="font-family:sans-serif;padding:16px;color:#ccc;">
        No files found in this workspace.
      </body></html>`;
    }

    const barSegments = result.languages
      .map(
        (l) =>
          `<span style="background:${l.color};width:${l.percentage}%;display:inline-block;height:100%;"></span>`
      )
      .join("");

    const languageItems = result.languages
      .map(
        (l) => `
        <div class="row">
          <div class="row-header">
            <span class="dot" style="background:${l.color}"></span>
            <span class="row-name">${l.name}</span>
            <span class="row-pct">${l.percentage.toFixed(1)}%</span>
          </div>
          <div class="row-sub">${l.fileCount} file${l.fileCount > 1 ? "s" : ""}</div>
        </div>`
      )
      .join("");

    const assetItems = result.assets
      .map(
        (a) => `
        <div class="row">
          <div class="row-header">
            <span class="dot" style="background:${a.color}"></span>
            <span class="row-name">${a.name}</span>
            <span class="row-count">${a.fileCount} file${a.fileCount > 1 ? "s" : ""}</span>
          </div>
        </div>`
      )
      .join("");

    return `
      <html>
      <head>
        <style>
          body {
            font-family: -apple-system, Segoe UI, sans-serif;
            padding: 14px;
            color: var(--vscode-foreground);
          }
          .bar {
            display: flex;
            width: 100%;
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 16px;
            background: #333;
          }
          .section-title {
            font-size: 11px;
            text-transform: uppercase;
            opacity: 0.5;
            margin: 18px 0 10px 0;
            letter-spacing: 0.5px;
          }
          .row {
            margin-bottom: 10px;
          }
          .row-header {
            display: flex;
            align-items: center;
            font-size: 13px;
          }
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 6px;
            flex-shrink: 0;
          }
          .row-name {
            flex: 1;
          }
          .row-pct {
            opacity: 0.8;
          }
          .row-count {
            opacity: 0.6;
            font-size: 12px;
          }
          .row-sub {
            font-size: 11px;
            opacity: 0.6;
            margin-left: 14px;
          }
          .footer {
            margin-top: 16px;
            font-size: 11px;
            opacity: 0.6;
            border-top: 1px solid #444;
            padding-top: 8px;
            display: flex;
            justify-content: space-between;
          }
        </style>
      </head>
      <body>
        ${hasCode ? `<div class="bar">${barSegments}</div>${languageItems}` : ""}
        ${hasAssets ? `<div class="section-title">Files</div>${assetItems}` : ""}
        <div class="footer">
          <span>Total Files: ${result.totalFiles}</span>
          <span>Total Folders: ${result.totalFolders}</span>
        </div>
      </body>
      </html>`;
  }
}
