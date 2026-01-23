<template>
  <DefaultTheme.Layout>
    <template #doc-after>
      <GiscusComment v-if="enableComment" />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GiscusComment from './components/GiscusComment.vue'

const { frontmatter } = useData()

// 默认启用评论，可通过 frontmatter 的 comment: false 禁用
const enableComment = computed(() => {
  return frontmatter.value.comment !== false
})
</script>
