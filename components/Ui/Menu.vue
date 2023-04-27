<template>
<div class="hidden md:flex h-[100%]">
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
  <div class="w-15 flex items-center justify-center">logo</div>
  <div class="w-[100%] flex items-center justify-center">title</div>
  <div class="w-15 flex items-center justify-center">icon</div>
</div>
</template>
<script setup>
import { NIcon } from "naive-ui";
import { pinyin } from "pinyin-pro"
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
</script>
<style scoped>
.n-menu>>>.n-menu-item-content {
  padding-right: 32px;
}
</style>