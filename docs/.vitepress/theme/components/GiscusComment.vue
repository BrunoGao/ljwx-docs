<template>
  <div class="giscus-container">
    <component :is="'script'"
      src="https://giscus.app/client.js"
      :data-repo="repo"
      :data-repo-id="repoId"
      :data-category="category"
      :data-category-id="categoryId"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      :data-theme="theme"
      :data-lang="lang"
      data-loading="lazy"
      crossorigin="anonymous"
      async>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const { isDark, lang: docLang } = useData()

// Giscus 配置
// 请替换为您自己的 GitHub 仓库信息
const repo = computed(() => 'ljwx/ljwx-docs') // 替换为您的仓库
const repoId = computed(() => 'R_kgDOxxxxxx') // 替换为您的仓库 ID
const category = computed(() => 'General') // 讨论分类
const categoryId = computed(() => 'DIC_kwDOxxxxxx') // 替换为您的分类 ID

// 主题跟随 VitePress
const theme = computed(() => isDark.value ? 'dark' : 'light')

// 语言跟随文档
const lang = computed(() => docLang.value === 'zh-CN' ? 'zh-CN' : 'en')

// 监听主题变化，动态更新 Giscus
watch([isDark, docLang], () => {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (!iframe) return

  iframe.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: {
          theme: theme.value,
          lang: lang.value
        }
      }
    },
    'https://giscus.app'
  )
})

onMounted(() => {
  // 初始化时的处理
  console.log('Giscus comment system loaded')
})
</script>

<style scoped>
.giscus-container {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .giscus-container {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
}
</style>
