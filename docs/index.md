---
layout: page
title: 一一一五的井
---
<div class="m-home">
<main class="m-wrap">
<header class="m-head">
<img class="m-avatar" src="/images/avatar.jpg" alt="一一一五" />
<div class="m-id">
<h1>一一一五</h1>
<p>一只青蛙</p>
</div>
</header>
<p class="m-intro">
这里是我的数字洞穴 —— 收集技术笔记、踩坑记录、好用的工具，以及一些生活的颗粒感。<br/>
<span>井蛙不可以语于海者，拘于虚也。</span> 我知道自己在井里，所以我不停地往上爬。
</p>
<nav class="m-nav">
<a class="m-item" href="/java/index">
<span class="m-num">01</span>
<span class="m-label">井底之术</span>
<span class="m-desc">Java · 后端 · 中间件</span>
</a>
<a class="m-item" href="/dev/ai">
<span class="m-num">02</span>
<span class="m-label">井口之风</span>
<span class="m-desc">AI · Docker · 前沿架构</span>
</a>
<a class="m-item" href="/utils/index">
<span class="m-num">03</span>
<span class="m-label">井边之苔</span>
<span class="m-desc">潘多拉宝盒 · 工具 · 影视</span>
</a>
<a class="m-item" href="/other/memo">
<span class="m-num">04</span>
<span class="m-label">井蛙之言</span>
<span class="m-desc">面试 · 备忘 · 生活</span>
</a>
</nav>
</main>
</div>

<style>
.m-home {
  height: calc(100vh - var(--vp-nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
}
/* 首页隐藏全站 footer，使页面正好一屏 */
html:has(.m-home),
body:has(.m-home) { overflow: hidden; }
body:has(.m-home) .VPFooter { display: none !important; }
.m-wrap {
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
  animation: m-in .7s ease both;
}
@keyframes m-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.m-head {
  display: flex;
  align-items: center;
  gap: 18px;
}
.m-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 0 0 1px var(--vp-c-divider);
  flex-shrink: 0;
}
.m-id h1 {
  margin: 0 0 4px;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #1d4ed8, #3eaf7c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.1;
}
.m-id p {
  margin: 0;
  font-size: .92rem;
  color: var(--vp-c-text-2);
}

.m-intro {
  margin: 0;
  font-size: .95rem;
  line-height: 1.85;
  color: var(--vp-c-text-2);
  padding-left: 14px;
  border-left: 2px solid var(--vp-c-divider);
}
.m-intro span {
  font-family: 'Georgia', serif;
  font-style: italic;
  color: var(--vp-c-text-3);
}

.m-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 24px;
}
.m-item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 12px;
  align-items: baseline;
  padding: 14px 0 14px 2px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-decoration: none !important;
  color: inherit !important;
  transition: padding-left .25s ease, border-color .25s ease;
}
.m-item:hover {
  padding-left: 10px;
  border-color: var(--vp-c-text-1);
}
.m-item:hover .m-num { color: #3eaf7c; }
.m-item:hover .m-label { color: var(--vp-c-text-1); }
.m-item::after {
  content: '→';
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%) translateX(-6px);
  opacity: 0;
  color: var(--vp-c-text-3);
  transition: all .25s ease;
}
.m-item:hover::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.m-num {
  grid-row: 1 / 3;
  font-family: 'Georgia', serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  transition: color .25s ease;
  align-self: center;
}
.m-label {
  font-size: .98rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  transition: color .25s ease;
}
.m-desc {
  font-size: .78rem;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}

@media (max-width: 560px) {
  .m-wrap { gap: 2rem; }
  .m-head { gap: 14px; }
  .m-avatar { width: 60px; height: 60px; }
  .m-id h1 { font-size: 1.45rem; }
  .m-id p { font-size: .85rem; }
  .m-nav { grid-template-columns: 1fr; gap: 0; }
}
</style>
