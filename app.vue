<script setup>
import { NConfigProvider,darkTheme, useOsTheme } from 'naive-ui'
import { isDark, toggleDark } from '@/composables/dark'

const naiveTheme = ref(null)

onMounted(() => {
  naiveTheme.value = isDark.value ? darkTheme : null
})
watch(isDark, (newVal) => {
  naiveTheme.value = newVal ? darkTheme : null
})

</script>

<template>
  <Html>
    <Body
      class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-[#ecf0f3] dark:bg-[#1D1E22]"
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
