import { createComponent } from '@utils';
import * as vscode from 'vscode';
import { registerWxmlEmmetSnippets } from './wxmlEmmetSnippets';

export function activate(context: vscode.ExtensionContext) {
  // 配置wxml文件的Emmet支持
  const configureEmmetForWxmlDisposable = vscode.workspace.onDidOpenTextDocument(
    async (document) => {
      if (document.languageId === 'wxml' || document.fileName.endsWith('.wxml')) {
        // 优先设置文档语言为HTML，这样Emmet能正常工作
        await vscode.languages.setTextDocumentLanguage(document, 'html');

        // 关闭自动建议
        const activeEditor = vscode.window.visibleTextEditors.find((e) => e.document === document);

        if (activeEditor) {
          // 为当前编辑器设置关闭自动建议
          await vscode.workspace
            .getConfiguration('editor', { languageId: 'html', uri: document.uri })
            .update(
              'quickSuggestions',
              { other: false, comments: false, strings: false },
              vscode.ConfigurationTarget.WorkspaceFolder,
            );
        }
      }
    },
  );

  // 立即应用当前打开的wxml文件
  if (
    vscode.window.activeTextEditor &&
    (vscode.window.activeTextEditor.document.languageId === 'wxml' ||
      vscode.window.activeTextEditor.document.fileName.endsWith('.wxml'))
  ) {
    const { document } = vscode.window.activeTextEditor;
    vscode.languages.setTextDocumentLanguage(document, 'html');

    // 关闭自动建议
    vscode.workspace
      .getConfiguration('editor', { languageId: 'html', uri: document.uri })
      .update(
        'quickSuggestions',
        { other: false, comments: false, strings: false },
        vscode.ConfigurationTarget.WorkspaceFolder,
      );
  }

  // 全局配置Emmet支持wxml
  const emmetConfig = vscode.workspace.getConfiguration('emmet');
  const includeLanguages = (emmetConfig.get('includeLanguages') as Record<string, string>) || {};

  // 确保wxml被映射到html
  if (!includeLanguages.wxml) {
    includeLanguages.wxml = 'html';
    emmetConfig.update('includeLanguages', includeLanguages, vscode.ConfigurationTarget.Global);
  }

  // 确保Emmet在wxml文件中启用
  emmetConfig.update('showExpandedAbbreviation', 'always', vscode.ConfigurationTarget.Global);
  emmetConfig.update('triggerExpansionOnTab', true, vscode.ConfigurationTarget.Global);

  // 配置文件关联
  const filesConfig = vscode.workspace.getConfiguration('files');
  const associations = (filesConfig.get('associations') as Record<string, string>) || {};

  if (!associations['*.wxml']) {
    associations['*.wxml'] = 'html';
    filesConfig.update('associations', associations, vscode.ConfigurationTarget.Global);
  }

  // 禁用建议弹出
  vscode.workspace
    .getConfiguration('editor')
    .update(
      'quickSuggestions',
      { other: false, comments: false, strings: false },
      vscode.ConfigurationTarget.Global,
    );

  // 注册WXML的Emmet片段
  registerWxmlEmmetSnippets(context);

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
    configureEmmetForWxmlDisposable,
    createReactComponentDisposable,
    createVueComponentDisposable,
    createMiniPageDisposable,
    createMiniComponentDisposable,
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
