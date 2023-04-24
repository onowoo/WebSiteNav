<template>
  <div
    class="w-80 md:flex flex-col justify-between dark:text-light-50 text-dark-200 dark:shadow-darkBox shadow-lightBox hidden"
  >
    <UiHeader />
    <UiSearch />
    <UiMenu />
  </div>

  <div class="flex md:hidden">
    mobile menu
  </div>
</template>
<script setup>

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
