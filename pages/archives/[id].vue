<template>
    <div class="md:py-10 md:px-12 py-2 px-3 w-[100%] flex flex-col justify-center" v-if="!pending">
        <div class="mb-6 mt-6 md:mt-0 flex md:flex-row flex-col justify-between gap-6">
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">1</div>
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">2</div>
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">3</div>
        </div>
        <div class="w-[100%] h-[60vh] relative">
            <div class="rounded-md p-4 bg-[rgb(247,252,255,0.8)] dark:bg-dark-400/80 backdrop-filter backdrop-blur backdrop-blur-xl shadow-lightBox dark:shadow-darkBox absolute inset-0 m-auto w-auto h-full">
                <div class="flex flex-col h-[100%] md:px-8 px-3">
                    <div class="flex justify-between h-[10%]">
                        <div class="flex items-center gap-1">
                            <n-button color="#21dbf5" circle size="tiny"><carbon:arrow-left /></n-button>
                            <div class="text-[#21dbf5]">点击返回</div>
                        </div>
                        <div class="flex items-center">
                            <n-button size="tiny" color="#21dbf5" class=" text-white" @click="navigateTo(getDetail.archivesInfo.outlink,{ external: true })">立即访问</n-button>
                        </div>
                    </div>
                    <div class="flex md:flex-row flex-col justify-evenly items-center h-[80%] w-[100%]">
                        <div class="w-[50%] flex flex-col items-center justify-center gap-3 md:gap-6 h-[100%]">
                            <div class="flex flex-col justify-center">
                                <div class="text-2xl text-center">{{ getDetail.archivesInfo.title }}</div>
                                <div class="text-2xl text-center">
                                    <n-popover :show-icon="false" :style="{'backround-color' : '#fff'}">
                                        <template #trigger>
                                            <n-rate size="small" readonly allow-half :value="rateValue"/>
                                        </template>
                                            <div class="flex gap-6">
                                                <div class="flex items-center gap-1"><carbon:thumbs-up-filled /></div>

                                                <div class="flex items-center gap-1 pt-2" @click="dislikesVote(getDetail.archivesInfo.id)"><carbon:thumbs-down-filled /></div>
                                            </div>
                                    </n-popover>
                                </div>
                            </div>
                            <div class="dark:text-[#21dbf5] overflow-y-scroll" v-html="getDetail.archivesInfo.content || '暂无简介'"></div>
                            <div class="my-4 md:mt-10 flex gap-2">
                                <n-tag v-for="item in getDetail.archivesInfo.taglist" :bordered="false" size="small" round class="bg-[#ecf0f3] dark:bg-[#1d1e22] text-[#21dbf5]">{{ item.name }}</n-tag>
                                <n-tag :bordered="false" size="small" round class="bg-[#ecf0f3] dark:bg-[#1d1e22] text-[#21dbf5]">{{ getDetail.archivesInfo.create_date }}</n-tag>
                            </div>
                        </div>
                        <div class="w-[50%] flex justify-center h-[100%] items-center">
                            <n-image :src="getDetail.archivesInfo.image" class="rounded-md overflow-hidden h-60 md:h-100 md:w-100 absolute"/>
                            <div class="h-60 md:h-100 md:w-100 flex justify-end items-end p-6">
                                <n-button size="tiny" :bordered="false" class="bg-[#ecf0f3] dark:bg-[#1d1e22] text-[#21dbf5]">{{ getDetail.archivesInfo.channel.name }}</n-button>
                            </div>
                        </div>
                    </div>
                    <div class="h-[10%] flex justify-center items-center gap-5 md:gap-10 text-2xl mt-3 text-dark-50 dark:text-[#21dbf5]">
                        <div><carbon:view-filled /></div>
                        <div><carbon:favorite-filled /></div>
                        <div><carbon:thumbs-up-filled /></div>
                        <div class="flex items-center text-3xl"><n-icon><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M408 48H104a72.08 72.08 0 0 0-72 72v192a72.08 72.08 0 0 0 72 72h24v64a16 16 0 0 0 26.25 12.29L245.74 384H408a72.08 72.08 0 0 0 72-72V120a72.08 72.08 0 0 0-72-72zM160 248a32 32 0 1 1 32-32a32 32 0 0 1-32 32zm96 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32zm96 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32z" fill="currentColor"></path></svg></n-icon></div>
                    </div>
                </div>
            </div>
            <div 
            class="w-[100%] rounded-md h-[60vh]" 
            :style="{ backgroundImage: 'url(' + getDetail.archivesInfo.image + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }">
            </div>
        </div>
        <div class="mt-6 md:flex-row flex-col flex justify-between gap-6">
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">1</div>
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">2</div>
            <div class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20">3</div>
        </div>
    </div>
    <n-space vertical v-else>
        <n-skeleton height="40px" width="33%" />
        <n-skeleton height="40px" width="66%" :sharp="false" />
        <n-skeleton height="40px" round />
        <n-skeleton height="40px" circle />
    </n-space>
</template>
<script setup>

const route = useRoute()
const getDetail = ref({})
const rateValue = ref(0)
const query = { 
    id: route.params.id,
    lazy: false
}

const { data: detail ,pending,error } = await getArchivesDetail(query)
getDetail.value = detail ? JSON.parse(JSON.stringify(detail.value)) : false
console.log(getDetail.value)

const rateMap = {
  100: 5,
  90: 4.5,
  80: 4,
  70: 3.5,
  60: 3,
  50: 2.5,
  40: 2,
  30: 1.5,
  20: 1,
  10: 0,
};

rateValue.value = rateMap[Math.floor(getDetail.value.archivesInfo.likeratio / 10) * 10] || 0;

const dislikesVote = (id) => {
    const {data:voteResult} = getArchivesVote(id)
    console.log(voteResult);
}
</script>