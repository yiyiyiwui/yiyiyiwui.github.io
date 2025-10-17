import {defineConfig} from 'vitepress'

// 定义可复用的侧边栏配置
const collapsibleSidebar = {
    collapsible: true, // 可折叠
    collapsed: false   // 默认展开
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/',
    ignoreDeadLinks: true, //忽略死链检查
    title: "我的博客", // 网站标题，显示在浏览器标签和封面左上角
    description: "德智体美劳全面发展", // 网站描述，用于SEO和社交媒体分享

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [ // 导航栏配置
            {text: '首页', link: '/'}, // 导航项：首页
            {text: '关于', link: '/admin/my'}, //
            {text: '潘多拉', link: '/utils/index'}, // 导航项：关于
            {text: 'Java', link: '/java/index'}, // 导航项：java
            {text: 'Linux', link: '/linux/index'}, // 导航项：linux
            {
                text: '组件',
                items: [
                    { text: 'MySql', link: '/dev/mysql' },
                    { text: 'Nginx', link: '/dev/nginx' },
                    {text: 'Redis', link: '/dev/redis'},
                    { text: 'Docker', link: '/dev/docker' }
                ]
            }
        ],
        search: { //搜索
            provider: 'local'
        },
        outlineTitle: '页面导航',
        footer: {
            message: '<img src="/images/03.png" alt="Logo" style="height: 180px; vertical-align: middle; margin-right: 8px;"> hello world',
            copyright: '© 2025 本博客已省略 9999 个 bug'
        },
        sidebar: { // 侧边栏
            // 默认侧边栏（可选，用于没有匹配到特定路径时）
            '/': [
                // {
                //     text: '示例',
                //     items: [
                //         {text: 'Markdown示例', link: '/markdown-examples'},
                //         {text: 'API示例', link: '/api-examples'}
                //     ]
                // }
            ],

            '/utils/': [
                {
                    text: '概览',
                    ...collapsibleSidebar,
                    items: [
                        {text: 'Ai', link: '/utils/ai'},
                        {text: '影视', link: '/utils/movie'},
                        {text: '工具', link: '/utils/util'},
                        {text: '潘多拉', link: '/utils/pdl'},
                    ]
                }
            ],

            // 当访问/java/路径下的页面时显示的侧边栏
            '/java/': [
                {
                    text: '概览',
                    ...collapsibleSidebar,
                    items: [
                        {text: 'Java基础', link: '/java/java'},
                        {text: '开源框架', link: '/java/openSource'},
                        {text: 'MybatisPlus', link: '/java/mp'},
                        {text: 'SpringCloud', link: '/java/springCloud'},
                        {text: 'WebSocket', link: '/java/webSocket'},
                        {text: 'SpringCache', link: '/java/springCache.md'},
                        {text: '位图', link: '/java/bitmap'},
                        {text: 'Spring', link: '/java/spring'},
                        {text: 'MQTT', link: '/java/mqtt'},
                        {text: 'SpringTask', link: '/java/springTask'},
                        {text: 'ES', link: '/java/es'},
                        {text: '分布式事务', link: '/java/dt'},
                        {text: 'Java项目', link: '/java/project'},
                        {text: 'MQ', link: '/java/mq'},
                        {text: 'Mybatis', link: '/java/mybatis'}
                    ]
                }
            ],

            // 当访问/linux/路径下的页面时显示的侧边栏
            '/linux/': [
                {
                    text: 'Linux基础',
                    ...collapsibleSidebar,
                    items: [
                        {text: '常用命令', link: '/linux/commands'},
                        {text: '文件系统', link: '/linux/filesystem'},
                        {text: '权限管理', link: '/linux/permissions'}
                    ]
                },
                {
                    text: 'Linux高级',
                    ...collapsibleSidebar,
                    items: [
                        {text: 'Shell脚本', link: '/linux/shell'},
                        {text: '系统管理', link: '/linux/administration'}
                    ]
                }
            ]

        },

        socialLinks: [ // 社交媒体链接配置
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'} // GitHub链接
        ]

    }
})