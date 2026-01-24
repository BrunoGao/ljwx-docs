import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "LJWX Docs",
  description: "知识资产化系统文档",

  // Mermaid 配置
  mermaid: {
    // 可选：自定义 Mermaid 配置
  },
  mermaidPlugin: {
    class: 'mermaid'
  },

  // 多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '快速开始', link: '/QUICK-REFERENCE' },
          {
            text: 'DevOps',
            items: [
              { text: 'GitOps 实践', link: '/devops/gitops/' },
              { text: 'CI/CD', link: '/devops/ci-cd/' },
              { text: '基础设施', link: '/devops/infrastructure/' }
            ]
          },
          {
            text: '数据平台',
            items: [
              { text: '数据平台概览', link: '/data-platform/' },
              { text: '数据分析最佳实践', link: '/data-platform/data-analysis-best-practices' }
            ]
          },
          {
            text: '数据分析',
            items: [
              { text: 'n8n 自动化', link: '/data-analytics/n8n/' },
              { text: '数据可视化', link: '/data-analytics/visualization/' },
              { text: 'ETL 工具', link: '/data-analytics/etl/' }
            ]
          },
          {
            text: 'AI/ML',
            items: [
              { text: '大语言模型', link: '/ai-ml/llm/' },
              { text: '模型服务', link: '/ai-ml/model-serving/' },
              { text: 'AI 应用', link: '/ai-ml/applications/' }
            ]
          },
          {
            text: '可观测性',
            items: [
              { text: '日志管理', link: '/observability/logging/' },
              { text: '链路追踪', link: '/observability/tracing/' },
              { text: '指标监控', link: '/observability/metrics/' }
            ]
          },
          {
            text: '项目管理',
            items: [
              { text: 'Plane 实践', link: '/project-management/plane/' },
              { text: '敏捷开发', link: '/project-management/agile/' }
            ]
          },
          {
            text: '更多',
            items: [
              { text: '架构设计', link: '/architecture/' },
              { text: '安全实践', link: '/security/' },
              { text: '案例研究', link: '/case-studies/' },
              { text: '资源中心', link: '/resources/' },
              { text: '视觉测试', link: '/visual-test' }
            ]
          }
        ],

        sidebar: {
          '/guide/': [
            {
              text: '指南',
              items: [
                { text: '架构设计', link: '/knowledge-asset-automation-design' },
                { text: '使用指南', link: '/knowledge-asset-usage-guide' },
                { text: 'Dify 同步指南', link: '/dify-knowledge-sync-guide' },
                { text: '快速参考', link: '/QUICK-REFERENCE' }
              ]
            }
          ],
          '/data-platform/': [
            {
              text: '数据平台',
              items: [
                { text: '概览', link: '/data-platform/' },
                { text: '数据分析最佳实践', link: '/data-platform/data-analysis-best-practices' }
              ]
            },
            {
              text: '核心能力',
              items: [
                { text: '数据治理', link: '/data-platform/data-analysis-best-practices#第23-25页-数据治理详解' },
                { text: '数据处理', link: '/data-platform/data-analysis-best-practices#第10页-总体架构五层数据处理精简版' },
                { text: '质量管理', link: '/data-platform/data-analysis-best-practices#第23页质量管理体系' }
              ]
            },
            {
              text: '技术指南',
              items: [
                { text: 'FAQ', link: '/data-platform/data-analysis-best-practices#第36页-常见问题解答faq' },
                { text: '技术决策', link: '/data-platform/data-analysis-best-practices#第37页-技术决策指南' },
                { text: '实施路线图', link: '/data-platform/data-analysis-best-practices#第38页-实施路线图' }
              ]
            }
          ]
        },

        footer: {
          message: '基于 VitePress 构建',
          copyright: 'Copyright © 2025 LJWX'
        },

        docFooter: {
          prev: '上一页',
          next: '下一页'
        },

        outline: {
          label: '页面导航',
          level: [2, 3]
        },

        lastUpdated: {
          text: '最后更新于',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },

        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Quick Start', link: '/en/QUICK-REFERENCE' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Visual Test', link: '/en/visual-test' }
        ],

        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Architecture Design', link: '/en/knowledge-asset-automation-design' },
                { text: 'Usage Guide', link: '/en/knowledge-asset-usage-guide' },
                { text: 'Dify Sync Guide', link: '/en/dify-knowledge-sync-guide' },
                { text: 'Quick Reference', link: '/en/QUICK-REFERENCE' }
              ]
            }
          ]
        },

        footer: {
          message: 'Built with VitePress',
          copyright: 'Copyright © 2025 LJWX'
        },

        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },

        outline: {
          label: 'On this page'
        },

        lastUpdated: {
          text: 'Last updated'
        }
      }
    }
  },

  // 主题配置
  themeConfig: {
    logo: '/logo.svg',

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/BrunoGao/ljwx-docs' }
    ],

    // 搜索配置 - 使用本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Reset search',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        }
      }
    }
  },

  // 最后更新时间
  lastUpdated: true,

  // 清理 URL
  cleanUrls: true,

  // Markdown 配置
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro'
    },
    // 代码块配置
    codeTransformers: [
      // 添加代码组支持
    ]
  },

  // 启用 MermaidJS
  vite: {
    optimizeDeps: {
      include: ['mermaid']
    }
  },

  // 构建配置
  build: {
    outDir: '../dist'
  }
}))
