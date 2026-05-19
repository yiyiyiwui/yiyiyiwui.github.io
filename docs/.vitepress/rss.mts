// 简单的 RSS 生成器：扫描所有 .md 页面，按 git 最近修改时间倒序，取前 30 条
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, join, dirname, relative } from 'node:path'
import matter from 'gray-matter'

interface RssOptions {
  siteUrl: string
  title: string
  description: string
}

function gitTime(filePath: string): string {
  try {
    const ts = execSync(`git log -1 --format=%aI -- "${filePath}"`, { stdio: ['pipe', 'pipe', 'ignore'] })
      .toString().trim()
    return ts || new Date().toISOString()
  } catch {
    return new Date().toISOString()
  }
}

function listMarkdownFiles(): string[] {
  try {
    return execSync('git ls-files "docs/**/*.md"', { stdio: ['pipe', 'pipe', 'ignore'] })
      .toString().trim().split('\n').filter(Boolean)
  } catch {
    return []
  }
}

function pageUrl(siteUrl: string, file: string): string {
  // docs/foo/bar.md -> /foo/bar
  const rel = relative('docs', file).replace(/\\/g, '/')
  let url = '/' + rel.replace(/\.md$/, '')
  if (url.endsWith('/index')) url = url.slice(0, -'index'.length)
  return siteUrl.replace(/\/$/, '') + url
}

function pageTitle(file: string, fm: any): string {
  if (fm.title) return String(fm.title)
  try {
    const content = readFileSync(file, 'utf-8').split('\n')
    const h1 = content.find(l => /^#\s+/.test(l))
    if (h1) return h1.replace(/^#\s+/, '').replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim()
  } catch {}
  const base = file.split(/[\\/]/).pop() || ''
  return base.replace(/\.md$/, '')
}

function pageSummary(file: string, fm: any): string {
  if (fm.description) return String(fm.description)
  try {
    const raw = readFileSync(file, 'utf-8')
    const { content } = matter(raw)
    const text = content
      .replace(/^#+\s.*$/gm, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/!?\[[^\]]*]\([^)]*\)/g, '')
      .replace(/[*_`>]/g, '')
      .replace(/\n+/g, ' ')
      .trim()
    return text.slice(0, 160)
  } catch {
    return ''
  }
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

export async function generateRSS(siteConfig: any, opts: RssOptions) {
  const files = listMarkdownFiles().filter(f => !f.endsWith('404.md') && !f.endsWith('index.md'))
  if (!files.length) {
    console.warn('[rss] 没有找到 markdown 文件，跳过')
    return
  }

  const items = files
    .map(f => {
      const raw = readFileSync(f, 'utf-8')
      const { data } = matter(raw)
      return {
        file: f,
        title: pageTitle(f, data),
        url: pageUrl(opts.siteUrl, f),
        date: gitTime(f),
        summary: pageSummary(f, data)
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30)

  const now = new Date().toUTCString()
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${xmlEscape(opts.title)}</title>
<link>${opts.siteUrl}</link>
<description>${xmlEscape(opts.description)}</description>
<language>zh-CN</language>
<lastBuildDate>${now}</lastBuildDate>
<atom:link href="${opts.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items.map(it => `<item>
<title>${xmlEscape(it.title)}</title>
<link>${it.url}</link>
<guid isPermaLink="true">${it.url}</guid>
<pubDate>${new Date(it.date).toUTCString()}</pubDate>
<description>${xmlEscape(it.summary)}</description>
</item>`).join('\n')}
</channel>
</rss>`

  const outDir = siteConfig?.outDir || resolve(process.cwd(), 'docs/.vitepress/dist')
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'feed.xml'), xml, 'utf-8')
  console.log(`[rss] 生成 ${items.length} 条到 ${join(outDir, 'feed.xml')}`)
}
