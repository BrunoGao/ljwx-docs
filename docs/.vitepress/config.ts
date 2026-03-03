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
            text: 'Bid-MVP Factory',
            items: [
              { text: 'Operator Quickstart', link: '/factory/' },
              { text: 'Dashboard', link: '/factory/dashboard' },
              { text: 'Traceability', link: '/factory/traceability' },
              { text: 'Onboarding', link: '/factory/onboarding' },
              { text: 'Templates', link: '/templates/' }
            ]
          },
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
              { text: '数据分析最佳实践', link: '/data-platform/data-analysis-best-practices' },
              { text: 'AI编排方法论与实践', link: '/data-platform/ai-orchestration-best-practices' },
              { text: '数据资产化系列', link: '/data-platform/data-assetization/' }
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
          '/factory/': [
            {
              text: 'Bid-MVP Factory',
              items: [
                { text: 'Operator Quickstart', link: '/factory/' },
                { text: 'Project Setup Runbook', link: '/factory/project-setup-runbook' },
                { text: 'Factory Process', link: '/factory/process' },
                { text: 'Roles and Ownership', link: '/factory/roles' },
                { text: 'Onboarding Automation', link: '/factory/onboarding' },
                { text: 'Evidence Dashboard', link: '/factory/dashboard' },
                { text: 'Traceability Chain', link: '/factory/traceability' }
              ]
            }
          ],
          '/templates/': [
            {
              text: 'Factory Templates',
              items: [
                { text: 'Templates Home', link: '/templates/' },
                { text: 'Spec Template', link: '/templates/spec-template' },
                { text: 'Architecture Template', link: '/templates/architecture-template' },
                { text: 'Demo Template', link: '/templates/demo-template' },
                { text: 'UAT Template', link: '/templates/uat-template' },
                { text: 'Release Template', link: '/templates/release-template' },
                { text: 'Acceptance Report Template', link: '/templates/acceptance-report-template' }
              ]
            }
          ],
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
                { text: '数据分析最佳实践', link: '/data-platform/data-analysis-best-practices' },
                { text: 'AI编排方法论与实践', link: '/data-platform/ai-orchestration-best-practices' }
              ]
            },
            {
              text: 'AI编排能力',
              items: [
                { text: '工具选型 (n8n vs Dify)', link: '/data-platform/ai-orchestration-best-practices#工具选型n8n-vs-dify' },
                { text: '五层AI编排架构', link: '/data-platform/ai-orchestration-best-practices#总体架构五层ai编排' },
                { text: '实践案例', link: '/data-platform/ai-orchestration-best-practices#数据处理场景实践案例' },
                { text: '工程化能力', link: '/data-platform/ai-orchestration-best-practices#工程化能力' }
              ]
            },
            {
              text: '数据处理能力',
              items: [
                { text: '数据治理', link: '/data-platform/data-analysis-best-practices#第23-25页-数据治理详解' },
                { text: '数据处理', link: '/data-platform/data-analysis-best-practices#第10页-总体架构五层数据处理精简版' },
                { text: '质量管理', link: '/data-platform/data-analysis-best-practices#第23页质量管理体系' }
              ]
            },
            {
              text: '技术指南',
              items: [
                { text: 'AI编排 FAQ', link: '/data-platform/ai-orchestration-best-practices#常见问题解答faq' },
                { text: 'AI编排最佳实践', link: '/data-platform/ai-orchestration-best-practices#最佳实践总结' },
                { text: '数据处理 FAQ', link: '/data-platform/data-analysis-best-practices#第36页-常见问题解答faq' },
                { text: '技术决策', link: '/data-platform/data-analysis-best-practices#第37页-技术决策指南' },
                { text: '实施路线图', link: '/data-platform/data-analysis-best-practices#第38页-实施路线图' }
              ]
            }
          ],
          '/data-platform/data-assetization/': [
            {
              text: '数据资产化系列',
              items: [
                { text: '系列概览', link: '/data-platform/data-assetization/' },
                { text: '理念篇', link: '/data-platform/data-assetization/why-data-assetization' },
                { text: '方法论篇', link: '/data-platform/data-assetization/data-assetization-methodology' }
              ]
            },
            {
              text: '核心技术能力',
              items: [
                { text: '数据清洗与质量保障', link: '/data-platform/data-assetization/data-cleaning-and-quality' },
                { text: '数据合规与安全', link: '/data-platform/data-assetization/data-compliance-and-security' },
                { text: '数据估值与定价', link: '/data-platform/data-assetization/data-valuation-and-pricing' },
                { text: '数据权属与证据链', link: '/data-platform/data-assetization/data-ownership-and-provenance' }
              ]
            },
            {
              text: '交易与实施',
              items: [
                { text: '数据交易与安全交付', link: '/data-platform/data-assetization/data-trading-and-delivery' },
                { text: '实施指南', link: '/data-platform/data-assetization/data-assetization-implementation' },
                { text: '案例集', link: '/data-platform/data-assetization/data-assetization-cases' }
              ]
            },
            {
              text: '附录',
              items: [
                { text: '统一材料包模板集', link: '/data-platform/data-assetization/data-assetization-audit-pack' }
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
