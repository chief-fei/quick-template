/*
 * @Author: 酋长(chief)
 * @Date: 2025-04-11 15:30:25
 * @LastEditTime: 2025-04-14 15:53:46
 * @LastEditors: 酋长(chief)
 * @Description: 微信小程序WXML的Emmet配置
 * @FilePath: /top-boilerplate/src/wxmlEmmetSnippets.ts
 */

import * as vscode from 'vscode';

// 微信小程序特有标签的Emmet片段
export const wxmlEmmetSnippets = {
  // 视图容器
  view: '<view>$1</view>',
  'scroll-view': '<scroll-view scroll-y="true">$1</scroll-view>',
  swiper: '<swiper indicator-dots="true" autoplay="true" interval="3000">$1</swiper>',
  'swiper-item': '<swiper-item>$1</swiper-item>',
  'movable-view': '<movable-view direction="all">$1</movable-view>',
  'movable-area': '<movable-area>$1</movable-area>',
  'cover-view': '<cover-view>$1</cover-view>',
  'cover-image': '<cover-image src="$1"></cover-image>',
  'match-media': '<match-media min-width="300">$1</match-media>',
  'page-container': '<page-container show="{{true}}">$1</page-container>',
  'root-portal': '<root-portal>$1</root-portal>',

  // 基础内容
  text: '<text>$1</text>',
  'rich-text': '<rich-text nodes="{{$1}}"></rich-text>',
  progress: '<progress percent="$1" show-info="true"></progress>',
  icon: '<icon type="success" size="23" />',
  selection: '<selection>$1</selection>',

  // 表单组件
  button: '<button type="primary">$1</button>',
  checkbox: '<checkbox value="$1">$2</checkbox>',
  'checkbox-group': '<checkbox-group bindchange="checkboxChange">$1</checkbox-group>',
  form: '<form bindsubmit="formSubmit">$1</form>',
  input: '<input placeholder="$1" />',
  picker: '<picker bindchange="bindPickerChange" value="{{index}}" range="{{$1}}"></picker>',
  'picker-view':
    '<picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;">$1</picker-view>',
  'picker-view-column': '<picker-view-column>$1</picker-view-column>',
  radio: '<radio value="$1">$2</radio>',
  'radio-group': '<radio-group bindchange="radioChange">$1</radio-group>',
  slider: '<slider bindchange="sliderChange" min="0" max="100" show-value />',
  switch: '<switch bindchange="switchChange" />',
  textarea: '<textarea placeholder="$1" />',
  label: '<label for="$1">$2</label>',
  editor: '<editor id="editor" class="editor" placeholder="$1"></editor>',
  'editor-portal': '<editor-portal>$1</editor-portal>',
  'keyboard-accessory': '<keyboard-accessory>$1</keyboard-accessory>',

  // 导航
  navigator: '<navigator url="$1">$2</navigator>',
  'functional-page-navigator':
    '<functional-page-navigator name="$1">$2</functional-page-navigator>',

  // 媒体组件
  image: '<image src="$1" mode="aspectFit"></image>',
  video: '<video src="$1"></video>',
  camera: '<camera mode="normal"></camera>',
  'live-player': '<live-player src="$1" mode="live" autoplay></live-player>',
  'live-pusher': '<live-pusher url="$1"></live-pusher>',
  audio: '<audio src="$1" controls></audio>',
  'channel-live': '<channel-live feedId="$1"></channel-live>',
  'channel-video': '<channel-video feedId="$1"></channel-video>',
  'voip-room': '<voip-room openid="$1"></voip-room>',

  // 地图
  map: '<map longitude="$1" latitude="$2"></map>',

  // 画布
  canvas: '<canvas canvas-id="$1"></canvas>',

  // 开放能力
  'open-data': '<open-data type="userNickName"></open-data>',
  'web-view': '<web-view src="$1"></web-view>',
  ad: '<ad unit-id="$1"></ad>',
  'ad-custom': '<ad-custom unit-id="$1"></ad-custom>',
  'official-account': '<official-account></official-account>',
  'store-home': '<store-home></store-home>',
  'store-product': '<store-product productId="$1"></store-product>',

  // 导航栏
  'navigation-bar': '<navigation-bar title="$1"></navigation-bar>',

  // 页面属性配置节点
  'page-meta': '<page-meta>$1</page-meta>',

  // 无障碍访问
  'aria-component': '<aria-component aria-label="$1"></aria-component>',

  // Skyline组件
  'list-view': '<list-view>$1</list-view>',
  'grid-view': '<grid-view>$1</grid-view>',
  'list-builder': '<list-builder>$1</list-builder>',
  'grid-builder': '<grid-builder>$1</grid-builder>',
  'open-data-list': '<open-data-list>$1</open-data-list>',
  'open-data-item': '<open-data-item>$1</open-data-item>',
  'nested-scroll-header': '<nested-scroll-header>$1</nested-scroll-header>',
  'nested-scroll-body': '<nested-scroll-body>$1</nested-scroll-body>',
  'draggable-sheet': '<draggable-sheet>$1</draggable-sheet>',
  'sticky-header': '<sticky-header>$1</sticky-header>',
  'sticky-section': '<sticky-section>$1</sticky-section>',
  'share-element': '<share-element>$1</share-element>',
  snapshot: '<snapshot>$1</snapshot>',
  span: '<span>$1</span>',

  // 专有区块级元素
  block: '<block wx:for="{{$1}}" wx:key="index">$2</block>',
};

// 注册WXML的Emmet片段
export function registerWxmlEmmetSnippets(context: vscode.ExtensionContext) {
  // 禁用编辑器自带的建议弹窗
  vscode.workspace
    .getConfiguration('editor')
    .update(
      'quickSuggestions',
      { other: false, comments: false, strings: false },
      vscode.ConfigurationTarget.Global,
    );

  // 为wxml文件启用tab展开功能
  vscode.workspace
    .getConfiguration('editor')
    .update('tabCompletion', 'on', vscode.ConfigurationTarget.Global);

  // Tab键直接展开，不显示建议
  const wxmlTabExpansionProvider = vscode.commands.registerCommand('wxml.expandEmmet', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const { document } = editor;
    const { selection } = editor;
    const position = selection.active;
    const line = document.lineAt(position.line);
    const lineText = line.text.substring(0, position.character);

    // 提取光标前的单词
    const tagMatch = lineText.match(/[\w-]+$/);
    if (!tagMatch) {
      // 如果没有匹配到标签，传递Tab给默认处理
      vscode.commands.executeCommand('tab');
      return;
    }

    const tag = tagMatch[0];

    // 查找是否有对应的片段且是标签类型（以<开头）
    if (tag in wxmlEmmetSnippets) {
      const snippet = wxmlEmmetSnippets[tag as keyof typeof wxmlEmmetSnippets];

      if (typeof snippet === 'string' && snippet.startsWith('<')) {
        // 删除原有的标签名
        const range = new vscode.Range(
          new vscode.Position(position.line, position.character - tag.length),
          position,
        );

        // 替换为展开的片段
        editor.insertSnippet(new vscode.SnippetString(snippet), range);
        return;
      }
    }

    // 对于不在片段列表中的标签或不是标签类型的项，使用默认的Tab行为
    vscode.commands.executeCommand('tab');
  });

  context.subscriptions.push(wxmlTabExpansionProvider);

  // 注册当wxml文件被激活时触发的事件
  const onWxmlEditorActivate = vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (
      editor &&
      (editor.document.languageId === 'wxml' || editor.document.fileName.endsWith('.wxml'))
    ) {
      // 确保当前编辑器是wxml文件，然后设置为正确的文件类型
      vscode.languages.setTextDocumentLanguage(editor.document, 'html');
    }
  });

  context.subscriptions.push(onWxmlEditorActivate);
}
