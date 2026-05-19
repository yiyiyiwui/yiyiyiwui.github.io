---
outline: deep
title: 潘多拉
---

# 潘多拉 🎁

> 这里是我的"宝盒"——收集翻到的、用过的、值得收藏的网站。<br/>
> 太多了，所以分了 4 个抽屉。

## ✨ 抽屉一览

<div class="pdl-cards">

  <a href="/utils/ai" class="pdl-card pdl-ai">
    <div class="pdl-icon">🤖</div>
    <h3>Ai 工具</h3>
    <p>大模型对话、AI 音乐、AI 视频、AI 图像、AI 编程……</p>
    <span class="pdl-go">进入 →</span>
  </a>

  <a href="/utils/movie" class="pdl-card pdl-movie">
    <div class="pdl-icon">🎬</div>
    <h3>影视资源</h3>
    <p>电影 / 电视 / 动漫的在线观看与下载站点。</p>
    <span class="pdl-go">进入 →</span>
  </a>

  <a href="/utils/util" class="pdl-card pdl-util">
    <div class="pdl-icon">🔧</div>
    <h3>工具网站</h3>
    <p>在线工具、开源项目、前端组件、文件处理……</p>
    <span class="pdl-go">进入 →</span>
  </a>

  <a href="/utils/pdl" class="pdl-card pdl-box">
    <div class="pdl-icon">🎁</div>
    <h3>宝盒杂物</h3>
    <p>学习资源、激活教程、软件、生活类零碎收藏。</p>
    <span class="pdl-go">进入 →</span>
  </a>

</div>

<style>
.pdl-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 1.4rem;
}
.pdl-card {
  display: block;
  padding: 22px 22px 18px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: inherit !important;
  transition: all .28s ease;
  position: relative;
  overflow: hidden;
}
.pdl-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, currentColor 0%, transparent 100%);
  opacity: 0;
  transition: opacity .3s;
}
.pdl-card:hover {
  transform: translateY(-4px);
  border-color: currentColor;
  box-shadow: 0 14px 32px -12px rgba(0,0,0,.18);
}
.pdl-card:hover::before { opacity: .06; }
.pdl-card > * { position: relative; z-index: 1; }
.pdl-card h3 {
  margin: 6px 0 6px;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
}
.pdl-card p {
  margin: 0 0 12px;
  font-size: .88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.pdl-icon { font-size: 1.6rem; }
.pdl-go {
  font-size: .82rem;
  font-weight: 600;
  color: currentColor;
}
.pdl-ai    { color: #1d4ed8; }
.pdl-movie { color: #ed5e93; }
.pdl-util  { color: #3eaf7c; }
.pdl-box   { color: #f0a020; }

@media (max-width: 640px) {
  .pdl-cards { grid-template-columns: 1fr; }
}
</style>
