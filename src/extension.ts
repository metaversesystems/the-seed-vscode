'use strict';

import * as vscode from 'vscode';

import { ConfigOptionProvider } from './configOptions';

export function activate(context: vscode.ExtensionContext) {
  const configProvider = new ConfigOptionProvider();
  vscode.window.registerTreeDataProvider('configOptions', configProvider);
}

export function deactivate() {}
