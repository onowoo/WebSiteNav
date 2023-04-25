<template>
    <div class="h-15 flex justify-center items-center gap-8 border-t dark:border-dark-300">
      <button
        class="hover:text-primary px-2 py-1 focus:outline-transparent rounded-md"
        @click="toggleLocales"
      >
        <carbon:language class="h-5 w-5" />
      </button>
      <ClientOnly>
        <button
          class="px-2 py-1 rounded-md text-black dark:text-white rounded-md hover:text-primary"
          @click="(e) => toggleDark()"
        >
          <carbon:moon class="h-5 w-5" v-if="isDark" />
          <carbon:sun class="h-5 w-5" v-else />
        </button>
      </ClientOnly>
      <button
        class="hover:text-primary px-2 py-1 rounded-md"
        @click="(e) => gotoGitHub()"
      >
        <carbon:logo-github class="h-5 w-5" />
      </button>
    </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { isDark, toggleDark } from '@/composables/dark'
const { t, locale, availableLocales } = useI18n()
const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  console.log(locale.value)
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const gotoGitHub = () => {
  window.open('https://github.com/onowoo/WebSiteNav')
}
</script>
<style scoped>
button {
  border:none;
  outline: none;
}
</style>