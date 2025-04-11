import { createComponent } from '@utils';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const createReactComponentDisposable = vscode.commands.registerCommand(
    'fast-template.createReactComponent',
    async (uri: vscode.Uri) => createComponent(context, uri, 'react-component', 'react'),
  );

  const createVueComponentDisposable = vscode.commands.registerCommand(
    'fast-template.createVueComponent',
    async (uri: vscode.Uri) => createComponent(context, uri, 'vue-component', 'vue'),
  );

  const createMiniPageDisposable = vscode.commands.registerCommand(
    'fast-template.createMiniPage',
    async (uri: vscode.Uri) => createComponent(context, uri, 'mini-page', 'mini'),
  );

  const createMiniComponentDisposable = vscode.commands.registerCommand(
    'fast-template.createMiniComponent',
    async (uri: vscode.Uri) => createComponent(context, uri, 'mini-component', 'mini'),
  );

  context.subscriptions.push(
    createReactComponentDisposable,
    createVueComponentDisposable,
    createMiniPageDisposable,
    createMiniComponentDisposable,
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
