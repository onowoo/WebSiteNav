<template>
    <Main class="overflow-y-scroll"/>
</template>
<script setup>
const route = useRoute()
const { id } = route.params;
let query = {
        channel:Number(id),
        page:1,
    }
const { data:post } = await getArchives(query)
const catPost = JSON.parse(JSON.stringify(post.value))
if (!catPost.channel.id) {
    navigateTo('/')
} else {
    provide("postData",catPost.pageList.data)
    useHead({
        title: catPost.channel.seotitle,
        meta: [
            { name: 'description', content: catPost.channel.description },
            { name: 'keywords', content: catPost.channel.keywords },
        ],
    })
}
</script>