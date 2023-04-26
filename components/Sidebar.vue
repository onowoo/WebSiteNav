<template>
  <div
    class="w-80 h-screen md:flex flex-col dark:text-light-50 text-dark-200 dark:shadow-darkBox shadow-lightBox hidden"
  >
    <UiHeader />
    <UiSearch />
    <UiMenu />
    <UiFooterBar />
  </div>

  <div class="flex md:hidden">
    <UiMenu />
  </div>
</template>
