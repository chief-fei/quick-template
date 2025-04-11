import { createComponent } from '@utils';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const createReactComponentDisposable = vscode.commands.registerCommand(
    'quick-template.createReactComponent',
    async (uri: vscode.Uri) => createComponent(context, uri, 'react-component', 'react'),
  );

  const createVueComponentDisposable = vscode.commands.registerCommand(
    'quick-template.createVueComponent',
    async (uri: vscode.Uri) => createComponent(context, uri, 'vue-component', 'vue'),
  );

  context.subscriptions.push(createReactComponentDisposable, createVueComponentDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
