/*
 * Possible titles:
 * 99 bottles of beer on the wall
 * 99.99 PU (percent uptime)
 * Good Mornin'
 * Middle aged turk 
 * Chapo's Bouncy Castle 
 * Tales of a Melatonin Addict
 * No, FBI, this is not the site you are looking for 
 * The Digital Oregon Trail
 * TedSenpaisan
 * Teenage Caveman
 * */

/*
 * configureWebpack: {
        resolve: {
            alias: {
                '@alias': './images'
            }
        }
    }
 * */
module.exports = {
    title: 'The Ephemeral Homestead',
    patterns: ['**/*.md', '**/*.vue', '!drafts'], /* filters what gets built */
    description: 'i strongly dislike js',
    dest: './vuepress/../docs/',
    head: [ 
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }],
    ],
    themeConfig: {
        nav: [
            {
                text: 'Posts',
                link: '/posts/',
            }
        ],
                footer: {
            contact: [
                { type: 'github', link: 'https://github.com/MilesConn/' },
                /*{ type: 'mail', link:'mailto@mconn@andrew.cmu.edu' },*/
                ],
            copyright: [
                { text: 'Privacy Policy', link: 'https://policies.google.com/privacy?hl=en-US', },
            { text: 'CC4.0 | Copyright © 2020-present', link: 'https://creativecommons.org/licenses/by-nc-nd/4.0/', },
         ],
        },
    },
    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-katex'))
        }
    },
    plugins: [
        [
            '@vuepress/blog',
            {
                directories:    [
                {
                id: 'posts',
                dirname: '_posts',
                path: '/posts/',
                },
                ]
            }
        ]
    ]
}

/*
 *&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#109;&#099;&#111;&#110;&#110;&#064;&#097;&#110;&#100;&#114;&#101;&#119;&#046;&#099;&#109;&#117;&#046;&#101;&#100;&#117;',
 * footer: {
        contact: [
                { type: 'github', link: 'https://github.com/MilesConn/', },
                { type: 'mail', link: 'mconn@andrew.cmu.edu', },
            ],
         copyright: [
                { text: 'Privacy Policy', link: 'https://policies.google.com/privacy?hl=en-US', },
            { text: 'CC4.0 | Copyright © 2020-present', link: 'https://creativecommons.org/licenses/by-nc-nd/4.0/', },
         ],
        }
        ]
        */
