/*
 * @Author: 酋长(chief)
 * @Date: 2025-04-09 09:30:19
 * @LastEditTime: 2025-04-11 17:57:02
 * @LastEditors: 酋长(chief)
 * @Description: 创建组件
 * @FilePath: /top-boilerplate/src/utils/createComponent.ts
 */

import nodePlop from 'node-plop';
import path from 'path';
import * as vscode from 'vscode';

interface PlopOptions {
  templateName: 'mini-page' | 'mini-component' | 'react-component' | 'vue-component';
  fileName: string;
  languageType?: string;
  filePath: string;
  componentType?: string;
}

export async function createComponent(
  _context: vscode.ExtensionContext,
  uri: vscode.Uri,
  templateName: 'mini-page' | 'mini-component' | 'react-component' | 'vue-component',
  templateLanguage: 'react' | 'vue' | 'mini',
) {
  const plopOptions: PlopOptions = {
    templateName,
    fileName: '',
    languageType: '',
    filePath: '',
    componentType: '',
  };

  plopOptions.fileName = (await getComponentName(templateLanguage)) as string;
  if (!plopOptions.fileName) {
    return;
  }

  if (templateName.includes('vue-')) {
    plopOptions.componentType = (await getComponentType()) as string;
  }

  if (templateName.includes('react-') || templateName.includes('mini-')) {
    plopOptions.languageType = (await getLanguageType()) as string;
  }

  plopOptions.filePath = await getTargetPath(uri, plopOptions.fileName);

  generateTemplate(plopOptions);
}

const getPlopInstance = async () => {
  const plopInstance = await nodePlop(path.join(__dirname, '..', '..', 'plopfile.js'));
  return plopInstance;
};

/**
 * 获取组件名称
 * @param templateLanguage 模板语言
 * @returns 组件名称
 */
const getComponentName = async (
  templateLanguage: 'react' | 'vue' | 'mini',
): Promise<string | undefined> => {
  const componentName = await vscode.window.showInputBox({
    prompt: `请输入${templateLanguage === 'react' ? 'React' : 'Vue'}组件名称`,
    placeHolder: `例如: ${templateLanguage === 'react' ? 'myComponent' : 'my-component'}`,
    validateInput: (value) => {
      if (!value) {
        return '组件名称不能为空';
      }
      if (templateLanguage === 'react' && !/^[a-z][a-zA-Z0-9]*$/.test(value)) {
        return '组件名称必须以小写字母开头，且只能包含字母和数字,eg: myComponent';
      }
      if (templateLanguage === 'vue' && !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(value)) {
        return '组件名称必须以小写字母开头，且只能包含字母、数字和连字符,eg: my-component';
      }
      return null;
    },
  });

  if (!componentName) {
    return;
  }

  return componentName;
};

/**
 * 获取语言类型
 * @returns 语言类型
 */
const getLanguageType = async (): Promise<string | undefined> => {
  const languageType = await vscode.window.showQuickPick(['typescript', 'javascript'], {
    placeHolder: '请选择语言类型,建议使用typescript,老项目使用javascript',
  });

  if (!languageType) {
    return;
  }

  return languageType;
};

/**
 * 获取生成的目标路径
 * @param uri 文件路径
 * @param name 组件名称
 * @returns 目标路径
 */
const getTargetPath = async (uri: vscode.Uri, fileName: string) => {
  const targetPath = uri ? uri.fsPath : vscode.workspace.workspaceFolders![0].uri.fsPath;
  return path.join(targetPath, fileName);
};

/**
 * 获取vue组件类型
 * @returns 组件类型
 */
const getComponentType = async (): Promise<string | undefined> => {
  const componentType = await vscode.window.showQuickPick(['composition(vue3)', 'options(vue2)'], {
    placeHolder: '请选择组件类型',
  });
  if (!componentType) {
    return;
  }
  return componentType.split('(')[0].trim();
};

const generateTemplate = async (options: PlopOptions) => {
  const plopInstance = await getPlopInstance();
  const plop = plopInstance.getGenerator(options.templateName);

  plop
    .runActions(options)
    .then((res) => {
      if (res.failures.length) {
        vscode.window.showErrorMessage(`❌创建失败`);
      } else {
        vscode.window.showInformationMessage('✅创建成功');
      }
    })
    .catch(() => {
      vscode.window.showErrorMessage(`❌创建错误`);
    });
};
