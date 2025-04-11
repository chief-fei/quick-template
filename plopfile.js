module.exports = function (plop) {
  plop.setHelper('eq', function (v1, v2) {
    return v1 === v2;
  });

  // React 组件生成器
  plop.setGenerator('react-component', {
    description: '创建一个 React 组件',
    prompts: [
      {
        type: 'input',
        name: 'fileName',
        message: '组件名称:',
        validate: (input) => {
          if (!input) {
            return '组件名称不能为空';
          }
          if (!/^[a-z][a-zA-Z0-9]*$/.test(input)) {
            return '组件名称必须以小写字母开头，只能包含字母和数字,eg: myComponent';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'languageType',
        message: '语言类型:',
        choices: ['typescript', 'javascript'],
        default: 'typescript',
      },
      {
        type: 'input',
        name: 'filePath',
        message: '生成路径:',
        default: 'src/components',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{filePath}}/index.{{#if (eq languageType "typescript")}}tsx{{else}}js{{/if}}',
        templateFile: 'templates/react/component.react.hbs',
      },
    ],
  });

  // Vue 组件生成器
  plop.setGenerator('vue-component', {
    description: '创建一个 Vue 组件',
    prompts: [
      {
        type: 'input',
        name: 'fileName',
        message: '组件名称:',
        validate: (input) => {
          if (!input) {
            return '组件名称不能为空';
          }
          if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(input)) {
            return '组件名称必须以小写字母开头，只能包含字母和数字,eg: my-component';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'componentType',
        message: '组件类型:',
        choices: ['composition', 'options'],
        default: 'composition',
      },
      {
        type: 'input',
        name: 'filePath',
        message: '组件路径:',
        default: 'src/components',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{filePath}}/index.vue',
        templateFile: 'templates/vue/component.vue.hbs',
      },
    ],
  });

  // 微信小程序组件生成器
  plop.setGenerator('mini-component', {
    description: '创建一个微信小程序组件',
    prompts: [
      {
        type: 'input',
        name: 'fileName',
        message: '组件名称:',
        validate: (input) => {
          if (!input) {
            return '组件名称不能为空';
          }
          if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(input)) {
            return '组件名称必须以小写字母开头，只能包含字母和数字,eg: my-component';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'languageType',
        message: '脚本语言:',
        choices: ['typescript', 'javascript'],
        default: 'typescript',
      },
      {
        type: 'input',
        name: 'filePath',
        message: '组件路径:',
        default: 'src/components',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{filePath}}/{{fileName}}.wxml',
        templateFile: 'templates/mini/component/component.wxml.hbs',
      },
      {
        type: 'add',
        path: '{{filePath}}/{{fileName}}.less',
        templateFile: 'templates/mini/component/component.less.hbs',
      },
      {
        type: 'add',
        path: '{{filePath}}/{{fileName}}.json',
        templateFile: 'templates/mini/component/component.json.hbs',
      },
      {
        type: 'add',
        path: '{{filePath}}/{{fileName}}.{{#if (eq languageType "typescript")}}ts{{else}}js{{/if}}',
        templateFile: 'templates/mini/component/component.js.hbs',
      },
    ],
  });

  // 微信小程序页面生成器
  plop.setGenerator('mini-page', {
    description: '创建一个微信小程序页面',
    prompts: [
      {
        type: 'input',
        name: 'fileName',
        message: '页面名称:',
        validate: (input) => {
          if (!input) {
            return '页面名称不能为空';
          }
          if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(input)) {
            return '页面名称必须以小写字母开头，只能包含字母和数字,eg: my-page';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'languageType',
        message: '脚本语言:',
        choices: ['typescript', 'javascript'],
        default: 'typescript',
      },
      {
        type: 'input',
        name: 'filePath',
        message: '页面路径:',
        default: 'src/pages',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{filePath}}/{{fileName}}.wxml',
        templateFile: 'templates/mini/page/page.wxml.hbs',
      },
      {
        type: 'add',
        path: '{{filePath}}/{{fileName}}.less',
        templateFile: 'templates/mini/page/page.less.hbs',
      },
      {
        type: 'add',
        path: '{{filePath}}/{{fileName}}.json',
        templateFile: 'templates/mini/page/page.json.hbs',
      },
      {
        type: 'add',
        path: '{{filePath}}/{{fileName}}.{{#if (eq languageType "typescript")}}ts{{else}}js{{/if}}',
        templateFile: 'templates/mini/page/page.js.hbs',
      },
    ],
  });
};
