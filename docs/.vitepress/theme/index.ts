import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout)
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件或插件
  }
} satisfies Theme
