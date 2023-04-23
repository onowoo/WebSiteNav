<template>
  <div
    class="w-80 md:flex flex-col justify-between dark:text-light-50 text-dark-200 dark:shadow-darkBox shadow-lightBox hidden"
  >
    <div class="h-15 flex justify-center items-center gap-3 shadow-md">
      <img
        src="https://dummyimage.com/120x120?text=Ai"
        class="rounded-full w-10 h-10"
        alt=""
      />
      <div class="flex text-xl justify-center items-center">智子导航网</div>
    </div>
    <div class="pt-8 px-4">
        <n-input type="text" placeholder="快速搜索" round>
            <template #suffix>
                <carbon:search class="h-5 w-5" />
            </template>
        </n-input>
    </div>
    <n-collapse
      arrow-placement="right"
      class="h-full py-8 px-4 dark:text-light-50 border-b dark:border-dark-800"
    >
      <n-collapse-item title="青铜" name="1">
        <div class="pl-6 hover:bg-[#02dc82] p-2 rounded-md duration-500">
          可以
        </div>
        <div class="pl-6 hover:bg-[#02dc82] p-2 rounded-md duration-500">
          可以
        </div>
        <div class="pl-6 hover:bg-[#02dc82] p-2 rounded-md duration-500">
          可以
        </div>
      </n-collapse-item>
      <n-collapse-item title="白银" name="2">
        <div class="pl-6">很好</div>
      </n-collapse-item>
      <n-collapse-item title="黄金" name="3">
        <div class="pl-6">真棒</div>
      </n-collapse-item>
    </n-collapse>
    <div class="min-h-15 flex justify-center items-center gap-8">
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
  </div>

  <div class="flex md:hidden">
    mobile menu
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
.n-collapse >>> .n-collapse-item:not(:first-child) {
  border-top: none;
}
button {
  border:none;
  outline: none;
}
</style>
