<template>
    <div class="w-60 flex flex-col justify-between dark:text-light-50 text-dark-200 dark:shadow-darkBox shadow-lightBox">
        <div class="h-15 flex justify-center items-center gap-3 shadow-md">
            <img src="https://dummyimage.com/120x120?text=Ai" class="rounded-full w-10 h-10" alt="">
            <div class="flex text-xl justify-center items-center">智子导航网</div>
        </div>
        <n-collapse arrow-placement="right" class="h-full py-8 px-4 dark:text-light-50 border-b dark:border-dark-800">
            <n-collapse-item title="青铜" name="1">
            <div class="pl-6">可以</div>
            </n-collapse-item>
            <n-collapse-item title="白银" name="2">
            <div class="pl-6">很好</div>
            </n-collapse-item>
            <n-collapse-item title="黄金" name="3">
            <div class="pl-6">真棒</div>
            </n-collapse-item>
        </n-collapse>
        <div class="h-15">footer</div>
    </div>
</template>
<style scoped>
.n-collapse >>> .n-collapse-item:not(:first-child) {
 border-top:none
}
</style>