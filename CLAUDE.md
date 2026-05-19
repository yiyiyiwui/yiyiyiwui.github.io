# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 这是什么

一个用 VitePress 2.0-alpha 搭建的个人博客（"一一一五的井"），部署在 GitHub Pages：`https://yiyiyiwui.github.io`。内容是简体中文。博客同时承载两类东西：长篇技术笔记（Java、Linux）和大量收藏的网站链接（`utils/`、`other/`）。整体风格是"井蛙"主题——自嘲式、简约，分四块：井底之术 / 井口之风 / 井边之苔 / 井蛙之言。

## 常用命令

```bash
npm install           # 首次安装（注意：gray-matter 是直接依赖，给 RSS 用的）
npm run docs:dev      # 本地开发服务器，会从 5173 起向后找空闲端口
npm run docs:build    # 构建到 docs/.vitepress/dist/（同时跑 RSS 钩子）
npm run docs:preview  # 本地预览构建产物
```

没有测试、没有 lint。唯一的 "CI" 是 `.github/workflows/deploy.yml`：推 `main` → 构建 → 发布到 `gh-pages` 分支。改动前用户习惯在本地跑一次 build 确认能过。

## 架构

### 路由与内容

`docs/` 是 VitePress 的源码根。每个顶级子目录对应 `docs/.vitepress/config.mts` 里 navbar 的一项：

- `admin/` —— 关于页
- `utils/` —— "潘多拉"（Ai / 影视 / 工具 / 宝盒），都是链接收藏页
- `java/`、`linux/`、`dev/` —— 技术笔记
- `other/` —— 11 个分类子页，从原来一个巨大的 `memo.md` 拆出来的。新的杂项内容往这里加（每个主题一个 `.md`，同时在 config.mts 的 `/other/` 侧边栏注册）

`docs/index.md` 和 `docs/404.md` 都用 `layout: page`（没有侧边栏/footer），内联了完整的 HTML + `<style>`。它们不是普通的 markdown 内容页，要当成组件来看。

### 自定义构建链路

- **`docs/.vitepress/config.mts`** 集中了所有配置：navbar、各路径的 sidebar（Java 分了 5 组、`other` 是平铺一组）、SEO meta、社交链接（GitHub + 自定义 RSS SVG），以及通过 `head` 注入的 navbar logo 圆形/高清样式（见下面"踩坑记录"）。
- **`docs/.vitepress/rss.mts`** 通过 `buildEnd` 钩子接入。它会 shell 出去跑 `git log` 拿每个文件的最近修改时间，用 `gray-matter` 解析 frontmatter，最后把 `feed.xml` 写到构建输出目录。**只在 `npm run docs:build` 时跑**，dev 模式不会。失败只警告不阻断构建。
- **Sitemap** 是 VitePress 内置的（`sitemap.hostname`），也是只在 build 时生成。
- **`.github/workflows/deploy.yml`** 用 `peaceiris/actions-gh-pages@v3` 把 `dist/` 推到 `gh-pages` 分支，GitHub Pages 从那里 serve。

### 故意没做的事

- 没有评论系统、没有访问统计、没有自定义主题目录。曾经试过 `docs/.vitepress/theme/`，但 VitePress 2 alpha 不能稳定加载它，所以**所有 CSS 自定义都改成在 `config.mts` 的 `head` 里塞 `<style>` 标签**。
- 没有全站 `themeConfig.footer` —— 每个页面就在内容结束处收尾。

## 踩坑记录（这个仓库真实遇到过的）

- **public 静态资源路径**：`docs/public/` 下的文件引用时**不要带 `/public` 前缀**。写 `/images/avatar.jpg`，不要写 `/public/images/avatar.jpg`。`admin/my.md` 里嵌入的 PDF 之前就是这个写错，线上完全加载不出来。
- **markdown 里写 HTML**：VitePress 的 markdown 解析器很挑剔。在 `<div>` 块里**子元素不要缩进 4 个空格以上**（markdown 会当成代码块），并且**兄弟块元素之间不要有空行**（会重新进入 markdown 模式，下面的 HTML 直接当文本输出）。首页和 404 页的 HTML 全都顶格写就是这个原因。
- **emoji**：Unicode 13+（2020 年之后）的新 emoji，特别是 `🪄`（magic wand）和 `🪪`（ID card），在很多 Windows 系统上渲染成 `□` 方框。**只用 Unicode 6.0 时代的 emoji**（2015 年之前的大部分单字符 emoji 都是安全的）。侧边栏故意全程不用 emoji。
- **Navbar logo**：把 `themeConfig.logo.width/height` 设小 + 默认的 `object-fit: fill`，会得到一个被拉扁的、糊糊的小方块。现在 `head` 里那段样式强制 36×36、`border-radius: 50%`、`object-fit: cover`，别删。
- **frontmatter 没有 date 字段**：页面没有显式的发布时间，RSS 用的是 `git log` 的 mtime。如果你 `touch` 了某个文件或批量重写很多页，RSS 排序会把它们都顶到最前。

## 工作流约定

- Commit 信息一般是中文短句（历史上很多就是 `1` 或 `更新`，最近的会更具体一些）。
- 用户的验收方式是**在浏览器里看**，不是看测试。所以改了布局相关的东西，要起 dev server，用截图或 Chrome DevTools 自己看过再说"完成"。
- **`docs/public/files/java.pdf`** 是用户的简历，`admin/my.md` 里嵌着它。这是个二进制文件，**历史上 commit 时被漏过**——动 `docs/public/` 下任何东西之后，明确 `git status` 检查一下它有没有被纳入。
- `.idea/` 不要跟踪（之前是用 `git rm --cached` 处理过的，现在 `.gitignore` 已经覆盖）。
