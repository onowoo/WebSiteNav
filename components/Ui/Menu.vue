<template>
<div class="hidden md:flex h-[100%] border-b dark:border-dark-300">
  <n-space vertical class="w-[100%]">
    <n-menu 
    :options="menuOptions"
    :default-expanded-keys="defaultExpandedKeys"
    class="text-xs"
    >
    </n-menu>
  </n-space>
</div>
<div class="flex md:hidden w-[100%] h-10 shadow-md">
  <div class="w-15 flex items-center justify-center" @click="navigateTo('/')">
      <img
            src="https://dummyimage.com/220x120?text=LianNav"
            class="rounded-xl w-10 h-5 ml-3"
            alt=""
          />
  </div>
  <div class="w-[100%] flex items-center justify-center">{{ mobileName }}</div>
  <button class="w-15 flex items-center justify-center" @click="changeMobileMenuStatus()">
    <carbon:menu v-if="!mobileMenuStatus"/>
    <carbon:circle-measurement v-if="mobileMenuStatus"/>
  </button>
</div>
<n-drawer v-model:show="mobileMenuStatus" :placement="placement" class="bg-[#ecf0f3] dark:bg-[#1D1E22]">
    <n-drawer-content class="">
      <n-menu 
      :options="menuOptions"
      :default-expanded-keys="defaultExpandedKeys"
      class="text-xs"
      >
      </n-menu>
      <UiFooterBar />
    </n-drawer-content>
</n-drawer>
</template>
<script setup>
import { NIcon } from "naive-ui";
import { pinyin } from "pinyin-pro"
const route = useRoute()
const menuOptions = []
function renderIcon(imageUrl, className) {
  return () => h(NIcon, null, { default: () => h("img", { src: fetchConfig.baseURL + imageUrl , class: className,}) });
}
const { data:cat } = await getChannel()
const catList = JSON.parse(JSON.stringify(cat.value.channel))
console.log(catList);
// 遍历 catList
for (let i = 0; i < catList.length; i++) {
  const cat = catList[i];
  // 如果 type 为 channel
  if (cat.type === 'channel') {
    // 过滤非中文字符
    const chineseName = cat.name.replace(/&nbsp;└/g, '').replace(/&nbsp;├/g, '');
    //一级菜单有子菜单不链接
    const labelHref = ref(chineseName)
    if (cat.haschild != 1) {
      labelHref.value = () => h(
      "a",
      {
        href: "/" + pinyin(chineseName,{toneType:'none'}) + "/" + cat.id,
      },
      chineseName
    )
    }
    // 在 menuOptions 中添加对应元素
    menuOptions.push({
      label: labelHref.value,
      key: cat.id,
      icon: renderIcon(cat.image, "pt-0"),
      children: cat.haschild === 1 ? [] : undefined
    });
  }
}
// 遍历 catList
for (let i = 0; i < catList.length; i++) {
  const cat = catList[i];
  // 如果 type 为 list
  if (cat.type === 'list') {
    // 查找对应的 menuOptions 元素
    const menuOption = menuOptions.find(option => option.key === cat.parent_id);
    // 如果找到了
    if (menuOption) {
      // 过滤非中文字符
      const chineseName = cat.name.replace(/&nbsp;└/g, '').replace(/&nbsp;├/g, '');
      // 在 children:[] 中添加对应元素
      menuOption.children.push({
        label: () => h(
          "a",
          {
            href: "/" + pinyin(chineseName,{toneType:'none'}).replace(/\s+/g, '') + "/" + cat.id,
          },
          chineseName
        ),
        key: cat.id,
        icon: renderIcon(cat.image, "pt-0"),
        children: cat.haschild === 1 ? [] : undefined
      });
      
    }
  }
}
//默认展开的菜单
const defaultExpandedKeys = [catList[0].id]
//移动页NAV标题
const mobileName = ref("首页")
if (route.params.list) {
  mobileName.value = catList.find(element => element.id === Number(route.params.id)).name.replace(/&nbsp;└/g, '').replace(/&nbsp;├/g, '').replace(/\s+/g, '')
} else if (!route.params.list && route.params.id) {
  mobileName.value = "详情"
} else {
  mobileName.value = "首页"
}
console.log(route.params);
//移动菜单激活状态
const mobileMenuStatus = ref(false)
const placement = 'left'
const changeMobileMenuStatus = () => {
  mobileMenuStatus.value = true
}
console.log(mobileMenuStatus.value);
</script>
<style scoped>
.n-menu>>>.n-menu-item-content {
  padding-right: 32px;
}
</style>