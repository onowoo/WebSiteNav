<script setup>
import { NConfigProvider,darkTheme, useOsTheme } from 'naive-ui'
import { isDark, toggleDark } from '@/composables/dark'

const naiveTheme = ref(null)
computed(() => {
  naiveTheme.value = isDark.value === false ? "null" : darkTheme
})
</script>

<template>
  <Html>
    <Body
      class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 dark:bg-dark-300"
    >
      <NConfigProvider inline-theme-disabled :theme="naiveTheme">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </NConfigProvider>
    </Body>
  </Html>
</template>

<style>
</style>
