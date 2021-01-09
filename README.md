# 前端 UI 库

> 基于 `element-ui` 二次封装的 UI 组件库~

## 安装

项目使用 `lerna` 管理，并采用 `monorepo` 的代码管理方式。可以进行单个或多个模块进行导出使用。

> 推荐使用 `yarn` 安装而不是 `npm` 来安装。因为在这种情形下，`npm` 会生成错误的依赖树。

```bash
# 安装 yarn 

npm install -g yarn
# OR 下载安装
https://classic.yarnpkg.com/zh-Hans/

# 安装 lerna 
yarn add global lerna

# 安装项目依赖
lerna bootstrap
# OR 根目录下执行
yarn run bootstrap

# 启动
yarn run serve

# 使用构建，打包会生成 lib 文件，将生成的 js 文件直接用 script 引入即可
yarn run build:lib

# 在根目录安装 npm 包，以 axios 为例：
yarn add axios --dev -W
```

## 目录结构

```bash
docs：项目文档，组件维护说明文档。
 |
packages：# 组件存放目录，基于 monorepo 的目录管理结构
 |--button # 按钮组件
 |--dialog # 模态框组件
 |--table  # 表格组件
 |--theme-chalk # 样式文件
 |--index.ts # 导出文件 - 后期组件拆分独立仓库时可以删除
src：# 前端开发阶段目录，用于编写组件例子
```

## TODO

- [x] 搭建基础框架
- [x] 引入基础插件、ui 组件库
- [x] 实现组件库的按需加载
- [ ] 引入请求库，封装请求拦截器
- [ ] 模块化导出实现 - rollup
- [ ] 导出完整 sdk 包
