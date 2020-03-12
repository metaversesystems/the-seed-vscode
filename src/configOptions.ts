import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
const Config = require('@metaverse-systems/the-seed-utils/Config');

export class ConfigOptionProvider implements vscode.TreeDataProvider<TreeItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined> = new vscode.EventEmitter<TreeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined> = this._onDidChangeTreeData.event;

	data: TreeItem[];

    constructor() {
      let config_file = new Config();
	  this.data = [];
	 
	  Object.keys(config_file.config).forEach(section => {
		let opts: TreeItem[] = [];
		Object.keys(config_file.config[section]).forEach(option => {
		  opts.push(new TreeItem(option + ': ' + config_file.config[section][option]));
		});
		let s = new TreeItem(section, opts, vscode.TreeItemCollapsibleState.Expanded);
		this.data.push(s);
	  });
    }

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
		return element;
	  }
	
	  getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
		if (element === undefined) {
		  return this.data;
		}
		return element.children;
	  }
}

class TreeItem extends vscode.TreeItem {
  children: TreeItem[]|undefined;
  
  constructor(label: string, children?: TreeItem[], state?: vscode.TreeItemCollapsibleState) {
    super(label, state);
    if(state === undefined) {
      state = children === undefined ? vscode.TreeItemCollapsibleState.None :
      vscode.TreeItemCollapsibleState.Collapsed;
    }

	if(children !== undefined) this.contextValue = 'TreeItem';
	else this.contextValue = 'TreeBranch';
    this.children = children;
  }
}
