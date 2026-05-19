import { defineConfig } from 'vitepress'
import { generateRSS } from './rss.mts'

const SITE_URL = 'https://yiyiyiwui.github.io'
const SITE_TITLE = '我的博客'
const SITE_DESC = '一一一五的井 · 德智体美劳全面发展 · Java / Linux / AI / 工具收藏'

// 可复用的可折叠侧边栏配置
const collapsibleSidebar = {
    collapsed: false
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/',
    ignoreDeadLinks: true,
    title: SITE_TITLE,
    description: SITE_DESC,
    lang: 'zh-CN',
    cleanUrls: true,
    lastUpdated: true,

    // ---------- SEO / favicon / og ----------
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/images/03.png' }],
        ['link', { rel: 'apple-touch-icon', href: '/images/03.png' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'author', content: '一一一五' }],
        ['meta', { name: 'keywords', content: 'VitePress, Java, Linux, AI, 博客, 笔记, 工具收藏, 一一一五' }],
        // Open Graph
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: SITE_TITLE }],
        ['meta', { property: 'og:description', content: SITE_DESC }],
        ['meta', { property: 'og:image', content: `${SITE_URL}/images/avatar.jpg` }],
        ['meta', { property: 'og:url', content: SITE_URL }],
        ['meta', { property: 'og:site_name', content: SITE_TITLE }],
        // Twitter Card
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: SITE_TITLE }],
        ['meta', { name: 'twitter:description', content: SITE_DESC }],
        ['meta', { name: 'twitter:image', content: `${SITE_URL}/images/avatar.jpg` }],
        // RSS
        ['link', { rel: 'alternate', type: 'application/rss+xml', title: SITE_TITLE, href: `${SITE_URL}/feed.xml` }],
        // 全局样式：navbar logo 圆形 + 高清
        ['style', {}, `
.VPNavBarTitle .title img,
.VPImage.logo,
img.VPImage.logo {
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  object-fit: cover !important;
  image-rendering: -webkit-optimize-contrast;
  box-shadow: 0 0 0 1px rgba(0,0,0,.08);
}
`]
    ],

    // ---------- 站点地图 ----------
    sitemap: {
        hostname: SITE_URL
    },

    // ---------- 构建结束：生成 RSS ----------
    buildEnd: async (siteConfig) => {
        try {
            await generateRSS(siteConfig, { siteUrl: SITE_URL, title: SITE_TITLE, description: SITE_DESC })
        } catch (e) {
            console.warn('[rss] 生成失败：', (e as Error)?.message)
        }
    },

    themeConfig: {
        logo: { src: '/images/avatar.jpg', width: 36, height: 36 },

        nav: [
            { text: '首页', link: '/' },
            { text: '关于', link: '/admin/my' },
            { text: '潘多拉', link: '/utils/index' },
            { text: 'Java', link: '/java/index' },
            { text: 'Linux', link: '/linux/index' },
            { text: '其他', link: '/other/memo' },
            {
                text: '组件',
                items: [
                    { text: 'MySql', link: '/dev/mysql' },
                    { text: 'Nginx', link: '/dev/nginx' },
                    { text: 'Redis', link: '/dev/redis' },
                    { text: 'Docker', link: '/dev/docker' },
                    { text: 'Ai', link: '/dev/ai' }
                ]
            }
        ],

        search: { provider: 'local' },
        outlineTitle: '页面导航',
        outline: [2, 4],
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        docFooter: { prev: '上一篇', next: '下一篇' },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: { dateStyle: 'short', timeStyle: 'short' }
        },

        sidebar: {
            '/': [],

            '/utils/': [
                {
                    text: '潘多拉',
                    ...collapsibleSidebar,
                    items: [
                        { text: '总览', link: '/utils/index' },
                        { text: 'Ai', link: '/utils/ai' },
                        { text: '影视', link: '/utils/movie' },
                        { text: '工具', link: '/utils/util' },
                        { text: '宝盒', link: '/utils/pdl' }
                    ]
                }
            ],

            '/java/': [
                {
                    text: '基础',
                    ...collapsibleSidebar,
                    items: [
                        { text: 'Java 基础', link: '/java/java' }
                    ]
                },
                {
                    text: '框架',
                    ...collapsibleSidebar,
                    items: [
                        { text: 'Spring', link: '/java/spring' },
                        { text: 'Spring Cloud', link: '/java/springCloud' },
                        { text: 'Spring Cache', link: '/java/springCache' },
                        { text: 'Spring Task', link: '/java/springTask' },
                        { text: 'Mybatis', link: '/java/mybatis' },
                        { text: 'MybatisPlus', link: '/java/mp' },
                        { text: '开源框架', link: '/java/openSource' }
                    ]
                },
                {
                    text: '中间件 & 消息',
                    ...collapsibleSidebar,
                    items: [
                        { text: 'MQ', link: '/java/mq' },
                        { text: 'MQTT', link: '/java/mqtt' },
                        { text: 'WebSocket', link: '/java/webSocket' },
                        { text: 'ES', link: '/java/es' }
                    ]
                },
                {
                    text: '进阶',
                    ...collapsibleSidebar,
                    items: [
                        { text: '分布式事务', link: '/java/dt' },
                        { text: '位图', link: '/java/bitmap' }
                    ]
                },
                {
                    text: '项目',
                    ...collapsibleSidebar,
                    items: [
                        { text: 'Java 项目', link: '/java/project' }
                    ]
                }
            ],

            '/linux/': [
                {
                    text: 'Linux 基础',
                    ...collapsibleSidebar,
                    items: [
                        { text: '常用命令', link: '/linux/commands' },
                        { text: '文件系统', link: '/linux/filesystem' },
                        { text: '权限管理', link: '/linux/permissions' }
                    ]
                },
                {
                    text: 'Linux 高级',
                    ...collapsibleSidebar,
                    items: [
                        { text: 'Shell 脚本', link: '/linux/shell' },
                        { text: '系统管理', link: '/linux/administration' }
                    ]
                }
            ],

            '/other/': [
                {
                    text: '其他',
                    ...collapsibleSidebar,
                    items: [
                        { text: '备忘录', link: '/other/memo' },
                        { text: '面试问题', link: '/other/interview' },
                        { text: '英语学习', link: '/other/english' },
                        { text: 'Linux 相关', link: '/other/linux' },
                        { text: '开源项目', link: '/other/opensource' },
                        { text: '科学上网', link: '/other/vpn' },
                        { text: '做饭教程', link: '/other/cooking' },
                        { text: '文化博物馆', link: '/other/culture' },
                        { text: '有趣网站', link: '/other/fun' },
                        { text: '博客分享', link: '/other/blog' },
                        { text: '阅读', link: '/other/reading' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/yiyiyiwui' },
            { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415a3.3 3.3 0 0 1 3.3 3.3c0 1.823-1.477 3.285-3.3 3.285A3.285 3.285 0 0 1 0 20.715a3.3 3.3 0 0 1 3.291-3.3zM15.909 24h-4.665c0-6.218-5.043-11.252-11.244-11.252V8.083c8.857 0 15.909 7.053 15.909 15.917z" fill="currentColor"/></svg>' }, link: '/feed.xml', ariaLabel: 'RSS' }
        ]
    }
})
