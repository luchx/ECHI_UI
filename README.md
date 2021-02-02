# 前端 UI 库

> 基于 `element-ui` 二次封装的 UI 组件库~

## 使用

> 项目采用 `monorepo` 的代码管理方式。可以进行单个或多个模块进行导出使用。

推荐使用 `yarn` 安装而不是 `npm` 来安装。

```bash
# 安装 yarn 
npm install -g yarn
# OR 下载安装
https://classic.yarnpkg.com/zh-Hans/

# 安装 
npm run bootstrap

# 启动示例项目
npm run serve

# 启动文档项目
npm run docs:dev

# 使用构建，打包会生成 lib 文件，将生成的 js 文件直接用 script 引入即可
npm run release

# 使用构建打包主模块
npm run build:lib

# 使用构建打包子模块，用于按需引入，需配合 babel-plugin-component 插件使用
npm run build:esm

# 使用构建打包主题
npm run build:theme

# 发布新版本
lerna publish
```

## 提交规范

> 示例代码

```bash
git commit -m "feat: 添加 git hooks 检测"

# OR

git commit -m "refactor(axios): 重构 axios 配置"
```

按照一定的规范写 commit messages，可以在git push 代码之前（工具/脚本自动)检测 commit messages。规范提交信息。

```txt
commit message 包含三个部分，header, body和footer，其中header必须有，body和footer可以按情况省略。

示例 type 字段 => 具体可以查看目录 scripts/verifyCommit.js 的正则部分

feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

> 如果你遇到提交问题无法解决，可以使用 -n OR --no-verify 跳过检测（严重不推荐）

```bash
git commit -n -m "跳过 git hooks 检测"
```

## 目录结构

```bash
docs            # 项目文档，组件维护说明文档。
packages        # 组件存放目录，基于 monorepo 的目录管理结构
 |--...         # 其他通用组件
 |--shared      # 共享文件
 |--theme-chalk # 样式文件
 |--index.ts    # 导出文件 - 后期组件拆分独立仓库时可以删除
src             # 前端开发阶段目录，用于编写组件例子
lib             # 编译输出目录
scripts         # 脚本文件
```

## TODO

- [x] 搭建基础框架
- [x] 引入基础插件、ui 组件库
- [x] 实现组件库的按需加载
- [ ] 引入请求库，封装请求拦截器
- [x] 模块化导出实现 - rollup
- [ ] 导出完整 sdk 包
- [x] 分离 css 模块，单独打包
