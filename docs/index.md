---
layout: home

hero:
  name: "eiの小窝"
  text: "德智体美劳 全面发展"
  tagline: "写代码 · 运动 · 养猫 · 偶尔emo"
  image:
    src: /images/avatar.jpg   # 建议准备一个带猫/动物元素的 logo（或用默认的 vitepress logo 改色）
    alt: nanの小窝 logo
  actions:
    - theme: brand
      text: 最近文章 →
      link: /posts/             # 假设你有 posts/ 目录放博客
    - theme: alt
      text: 技术分类
      link: /categories/
    - theme: alt
      text: 关于我
      link: /admin/my

features:
  
  - icon: ⚡
    title: 后端 & 云
    details: Spring Boot / Java / Docker / K8s
    link: /java/index
  - icon: 🐧
    title: Linux & 运维
    details: Nginx / 系统调优 / 脚本 / 服务器
    link: /linux/index
  - icon: 🐱
    title: 生活碎片
    details: 日常 /  工具 / 电影 / 随机
    link: /utils/index
  - icon: 📚
    title: 学习笔记
    details: 算法 / 设计模式 / 数据库 / 前端摸索中...
    link: /test/index


---