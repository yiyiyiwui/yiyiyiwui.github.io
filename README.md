<div align="center">

  <img src="./docs/public/images/03.png" alt="logo" width="160" />

  <h1>我的博客</h1>

  <p><b>德智体美劳全面发展</b></p>

  <p>
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=500&color=4A90E2&center=true&vCenter=true&width=520&lines=Java+Developer;Linux+SysAdmin;Tool+Collector;Knowledge+Sharer" alt="Typing SVG" />
  </p>

  <p>
    <a href="https://yiyiyiwui.github.io"><img src="https://img.shields.io/badge/blog-online-4A90E2?style=flat-square&logo=googlechrome&logoColor=white" alt="blog" /></a>
    <img src="https://img.shields.io/badge/vitepress-2.0--alpha-646cff?style=flat-square&logo=vite&logoColor=white" alt="vitepress" />
    <img src="https://img.shields.io/badge/deploy-GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white" alt="github pages" />
    <img src="https://img.shields.io/github/stars/yiyiyiwui/yiyiyiwui.github.io?style=flat-square&color=yellow" alt="stars" />
  </p>

  <sub>© 2026 本博客已省略 9999 个 bug</sub>

</div>

---

## 📖 这是什么

基于 [VitePress](https://vitepress.dev/) 搭建的个人博客，主要用来：

- 📝 沉淀学习笔记（Java / Linux / 中间件 / AI）
- 🌐 收藏自己平时翻到的、觉得有意思的网站和开源项目
- 🤔 整理面试题、备忘录、踩坑记录

> 内容偏个人向，按"用得上"来组织，不追求大而全。

---

## 🗂️ 板块导览

| 板块 | 说明 |
|---|---|
| 🏠 **首页** | 站点入口 |
| 👋 **关于** | 关于我 |
| 🪄 **潘多拉** | Ai · 影视 · 工具 · 潘多拉宝盒 |
| ☕ **Java** | 基础 / Spring / MyBatis / MQ / ES / 分布式事务 等 |
| 🐧 **Linux** | 常用命令 · 文件系统 · 权限 · Shell · 运维 |
| 🌟 **其他** | 备忘录 · 面试题 · 英语学习 · Linux 资源 · 开源项目 · 做饭 · 博物馆 · 有趣网站 · 博客 · 阅读 |
| 🧩 **组件** | MySQL · Nginx · Redis · Docker · AI |

---

## 🛠️ 技术栈

<div align="center">
  <img src="https://skillicons.dev/icons?i=vite,vue,ts,nodejs,git,github,markdown,vscode" alt="tech" />
</div>

- **静态站点**：VitePress 2.0 (alpha)
- **托管**：GitHub Pages
- **CI/CD**：GitHub Actions（推 main 即自动部署）
- **图标**：Skillicons / Shields.io

---

## 🚀 本地启动

```bash
# 1. 克隆仓库
git clone https://github.com/yiyiyiwui/yiyiyiwui.github.io.git
cd yiyiyiwui.github.io

# 2. 安装依赖
npm install

# 3. 启动本地预览
npm run docs:dev
```

打开 [http://localhost:5173](http://localhost:5173) 即可。

> 完整的从 0 搭建到部署流程见 [📘 VitePress 从零搭建到部署完整指南](./新建文本文档.md)。

---

## 📁 目录结构

```
yiyiyiwui.github.io/
├── .github/workflows/        # GitHub Actions 自动部署
│   └── deploy.yml
├── docs/
│   ├── .vitepress/
│   │   └── config.mts        # 站点配置（导航、侧边栏、主题）
│   ├── public/               # 静态资源（图片、图标）
│   ├── admin/                # 关于
│   ├── utils/                # 潘多拉（Ai / 影视 / 工具 / 宝盒）
│   ├── java/                 # Java 系列
│   ├── linux/                # Linux 系列
│   ├── dev/                  # 组件（MySQL / Nginx / Redis / Docker / AI）
│   ├── other/                # 其他（面试 / 英语 / 开源 / 做饭 / 有趣 ...）
│   └── index.md              # 首页
├── package.json
└── README.md
```

---

## 📦 部署流程

向 `main` 分支推送代码后，GitHub Actions 会自动：

1. 拉取代码 → 安装依赖
2. `npx vitepress build docs` 构建静态文件
3. 推送到 `gh-pages` 分支
4. GitHub Pages 自动发布到 [https://yiyiyiwui.github.io](https://yiyiyiwui.github.io)

```
git add . → git commit -m "xxx" → git push origin main
                       ↓
            GitHub Actions 自动 build + deploy
                       ↓
        🎉 https://yiyiyiwui.github.io
```

---

## 🤝 关于本仓库

这是一个 **公开的个人博客仓库**，欢迎：

- ⭐ Star 收藏 —— 是对我最大的鼓励
- 🐛 Issue 反馈 —— 发现错别字、死链、坑点都可以提
- 🍴 Fork 当模板 —— 觉得目录结构合用就拿走

> "踩过的坑写下来，别人就不用再踩了。"

---

<div align="center">

  <sub>Made with ❤️ &nbsp;·&nbsp; Powered by <a href="https://vitepress.dev/">VitePress</a> &nbsp;·&nbsp; Hosted on <a href="https://pages.github.com/">GitHub Pages</a></sub>

</div>
