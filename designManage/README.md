# react-admin

> React 后台管理模板。技术栈：React@^16.13，umi@^3.x，antd@^4.x，ESLint等

## Install

```shell
yarn add git+ssh://git@git.moresec.cn:front-end/ms-cli.git#{version} -g
ms init [project name]
```

## Usage

```shell
// 1. install dependencies
yarn

// 2. start project
yarn start
```

## Others Command

```shell
// lint check
yarn lint

// build and submit
yarn submit
```

## Structure

```
.
├── .editorconfig                       # 编辑器配置
├── .env                                # 环境变量
├── .eslintignore                       # eslint 忽略目录
├── .eslintrc                           # eslint 配置
├── .gitignore                          # git 忽略葫芦
├── .prettierignore                     # prettier 忽略目录
├── .prettierrc                         # prettier 配置
├── .stylelintrc                        # stylelint 配置
├── README.md                           # 说明文档
├── config                              # umi 配置文件
│   ├── config.ts                         # 配置入口
│   ├── routes.config.ts                  # 路由
│   ├── theme.config.ts                   # antd 的样式变量
│   └── webpack.config.ts                 # webpack
├── dist                                # 打包后的文件夹
├── package.json                        # package.json
├── public                              # 公用资源
│   └── favicon.ico
├── src                                 # 源代码
│   ├── app.ts                            # 运行时配置文件
│   ├── assets                            # 静态资源
│   │   ├── icons                           # svg 图标
│   │   ├── images                          # 图片
│   ├── components                        # 公用组件
│   │   ├── MSIcon                          # svg 图标组件
│   │   ├── MSIconButton                    # 操作按钮组件
│   │   └── index.ts                        # 组件出口
│   ├── global.less                       # 全局样式
│   ├── layouts                           # 布局
│   │   ├── BasicLayout.tsx                 # 系统基础布局
│   │   ├── LoginLayout.tsx                 # 登录页布局
│   │   ├── components                      # 布局组件
│   │   │   ├── BasicHeader.tsx
│   │   │   ├── BasicSider.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   └── styles                          # 布局样式
│   │       ├── BasicHeader.less
│   │       ├── BasicLayout.less
│   │       ├── BasicSider.less
│   │       └── Breadcrumbs.less
│   ├── models                            # 全局 models
│   │   ├── app.ts
│   │   └── connect.d.ts
│   ├── pages                             # 页面目录
│   │   ├── 404                             # 404
│   │   ├── dashboard                       # 控制面板
│   │   ├── document.ejs                    # HTML 模板
│   │   ├── help                            # 帮助中心
│   │   ├── login                           # 登录
│   ├── services                          # api 接口
│   │   ├── api.ts                          # api 地址
│   │   └── index.ts
│   └── utils                             # 工具函数
│       ├── common.ts                       # 通用工具
│       ├── constant.ts                     # 常量
│       └── request.ts                      # 封装请求
├── tsconfig.json                       # tsconfig
├── typings.d.ts                        # typescript 声明文件
└── yarn.lock                           # yarn.lock
```

## Environment

> Node.js >= 10.13.0
> ie >= 11
