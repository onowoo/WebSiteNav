<template>
    <div class="md:py-10 md:px-12 py-2 px-3 w-[100%] flex flex-col">
        <div class="mb-6 flex justify-between gap-6">
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">1</div>
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">2</div>
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">3</div>
        </div>
        <div class="w-[100%] h-[60vh]" v-if="getDetail">
            <div class="rounded-md p-4 bg-dark-400/60 backdrop-filter backdrop-blur backdrop-blur-xl shadow-lightBox dark:shadow-darkBox my-auto absolute left-75 right-12 w-auto box-border h-[60vh]">
                {{getDetail}} 
            </div>
            <div 
            class="w-[100%] rounded-md h-[60vh]" 
            :style="{ backgroundImage: 'url(' + getDetail.archivesInfo.image + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }">
            </div>
        </div>
        <div v-else>Loading</div>
        <div class="mt-6 flex justify-between gap-6">
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">1</div>
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">2</div>
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">3</div>
        </div>
    </div>
</template>
<script setup>
const route = useRoute()

const getDetail = ref(null)

const fetchDetail = async () => {
    console.log('fetchDetail called with id:', route.params.id)
    const query = { id: route.params.id }
    const { data: detail } = await getArchivesDetail(query)
    console.log('detail:', detail)
    getDetail.value = detail ? JSON.parse(JSON.stringify(detail.value)) : null
    console.log('getDetail:', getDetail.value)
}
onMounted(() => {
  fetchDetail()
})
</script>