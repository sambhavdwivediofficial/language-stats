import * as vscode from "vscode";
import { DashboardProvider } from "./dashboardProvider";

export function activate(context: vscode.ExtensionContext) {
  const provider = new DashboardProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      DashboardProvider.viewType,
      provider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("languageStats.refresh", () => {
      provider.refresh();
    })
  );

  // Auto-refresh when files change/save/delete
  const watcher = vscode.workspace.createFileSystemWatcher("**/*");
  watcher.onDidChange(() => provider.refresh());
  watcher.onDidCreate(() => provider.refresh());
  watcher.onDidDelete(() => provider.refresh());
  context.subscriptions.push(watcher);
}

export function deactivate() {}
