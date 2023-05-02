<template>
    <div class="md:py-8 md:px-12 py-2 px-3 w-[100%] max-w-[1280px] mx-auto flex flex-col justify-center" v-if="!pending">
        <div class="h-20 w-[100%] rounded-md" style="background-image: url('https://www.laozuo.org/banner/hncloud.gif');background-size: 100% 100%;"></div>
        <div class="my-6 md:mt-6 flex md:flex-row flex-col justify-between gap-6">
            <div 
            class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20"
            v-for="item in topAd"
            :style="{backgroundImage:'url(' + item.image +')',backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'}"
            ></div>
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
                    <div class="h-[10%] flex justify-center items-center gap-5 md:gap-10 text-2xl mt-3 text-dark-50">
                        <n-popover trigger="hover" class="p-3" content-style="backround-color:#555555">
                            <template #trigger>
                                <n-button quaternary round size="40" class="p-3 rounded-full dark:text-[#21dbf5]"><carbon:view-filled /> </n-button>
                            </template>
                            <span>查看次数：{{ getDetail.archivesInfo.views }} 次</span>
                        </n-popover>
                        <n-popover trigger="hover">
                            <template #trigger>
                                <n-button quaternary round size="40" class="p-3 rounded-full dark:text-[#21dbf5]"><carbon:favorite-filled /></n-button>
                            </template>
                            <span>点我收藏此文</span>
                        </n-popover>
                        <n-popover trigger="hover">
                            <template #trigger>
                                <n-button quaternary round size="40" class="p-3 rounded-full dark:text-[#21dbf5]"><carbon:thumbs-up-filled /></n-button>
                            </template>
                            <span>已被 {{ getDetail.archivesInfo.likes }} 人点赞</span>
                        </n-popover>
                        <n-popover trigger="hover" class="flex items-center">
                            <template #trigger>
                                <n-button quaternary round size="40" class="p-3 rounded-full dark:text-[#21dbf5]" @click="showModal = true">
                                    <n-icon :size="30"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M408 48H104a72.08 72.08 0 0 0-72 72v192a72.08 72.08 0 0 0 72 72h24v64a16 16 0 0 0 26.25 12.29L245.74 384H408a72.08 72.08 0 0 0 72-72V120a72.08 72.08 0 0 0-72-72zM160 248a32 32 0 1 1 32-32a32 32 0 0 1-32 32zm96 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32zm96 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32z" fill="currentColor"></path></svg></n-icon>
                                </n-button>
                            </template>
                            <span>当前有 {{ getDetail.archivesInfo.comments }} 条讨论</span>
                        </n-popover>
                    </div>
                </div>
            </div>
            <div 
            class="w-[100%] rounded-md h-[60vh]" 
            :style="{ backgroundImage: 'url(' + getDetail.archivesInfo.image + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }">
            </div>
        </div>
        <div class="mt-6 md:flex-row flex-col flex justify-between gap-6">
            <div 
            class="rounded-md p-4 shadow-lightBox dark:shadow-darkBox w-[100%] h-20"
            v-for="item in bottomAd"
            :style="{backgroundImage:'url(' + item.image +')',backgroundSize: '100% 100%',backgroundRepeat: 'norepeat'}"
            ></div>
        </div>
    </div>
    <n-space vertical v-else>
        <n-skeleton height="40px" width="33%" />
        <n-skeleton height="40px" width="66%" :sharp="false" />
        <n-skeleton height="40px" round />
        <n-skeleton height="40px" circle />
    </n-space>
    <n-modal v-model:show="showModal">
        <n-card
        title="讨论区"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        style="width: 400px; position: fixed; right: 100px; bottom: 100px;border-radius: 10px;"
        >
        <template #header-extra>
            禁止与当前网站无关的内容
        </template>
        <section class="relative flex items-center justify-center antialiased">
    <div class="px-0 mx-auto">

        <div
            class="flex-col w-full py-4 mx-auto bg-[#ecf0f3] dark:bg-[#0f1114] border-b-2 border-r-2 border-gray-200 dark:border-dark-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
            <div class="flex flex-row">
                <img class="object-cover w-12 h-12 border-2 border-gray-300 dark:border-dark-300 rounded-full" alt="Noob master's avatar"
                    src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80">
                <div class="flex-col mt-1">
                    <div class="flex items-center flex-1 px-4 font-bold leading-tight">詹姆斯
                        <span class="ml-2 text-xs font-normal text-gray-500">2周前</span>
                    </div>
                    <div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">哈哈!!!我占据了一楼的位置?
                    </div>
                    <button class="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                        <svg class="w-5 h-5 ml-2 text-gray-600 cursor-pointer fill-current hover:text-gray-900"
                            viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                                fill-rule="nonzero" />
                        </svg>
                    </button>
                    <button class="inline-flex items-center px-1 -ml-1 flex-column">
                        <svg class="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
            <hr class="my-2 ml-16 border-gray-200 dark:border-dark-200">
            <div class="flex flex-row pt-1 md-10 md:ml-16">
                <img class="w-12 h-12 border-2 border-gray-300 dark:border-dark-300 rounded-full" alt="Emily's avatar"
                    src="https://images.unsplash.com/photo-1581624657276-5807462d0a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80">
                <div class="flex-col mt-1">
                    <div class="flex items-center flex-1 px-4 font-bold leading-tight">艾米丽
                        <span class="ml-2 text-xs font-normal text-gray-500">5天前</span>
                    </div>
                    <div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">自古一楼多人才
                    </div>
                    <button class="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                        <svg class="w-5 h-5 ml-2 text-gray-600 cursor-pointer fill-current hover:text-gray-900"
                            viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                                fill-rule="nonzero" />
                        </svg>
                    </button>
                    <button class="inline-flex items-center px-1 -ml-1 flex-column">
                        <svg class="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div
            class="flex-col w-full py-4 mx-auto mt-3  bg-[#ecf0f3] dark:bg-[#0f1114] border-b-2 border-r-2 border-gray-200 dark:border-dark-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
            <div class="flex flex-row md-10">
                <img class="w-12 h-12 border-2 border-gray-300 dark:border-dark-300 rounded-full" alt="Anonymous's avatar"
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80">
                <div class="flex-col mt-1">
                    <div class="flex items-center flex-1 px-4 font-bold leading-tight">狗剩
                        <span class="ml-2 text-xs font-normal text-gray-500">3天前</span>
                    </div>
                    <div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">楼上的是二哈
                    </div>
                    <button class="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                        <svg class="w-5 h-5 ml-2 text-gray-600 cursor-pointer fill-current hover:text-gray-900"
                            viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                                fill-rule="nonzero" />
                        </svg>
                    </button>
                    <button class="inline-flex items-center px-1 -ml-1 flex-column">
                        <svg class="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    </div>
</section>
        <template #footer>
            <div class="text-center">这里准备放置小广告</div>
        </template>
        </n-card>
    </n-modal>
</template>
<script setup>

const route = useRoute()
const showModal = ref(false)
const getDetail = ref({})
const rateValue = ref(0)
const query = { 
    id: route.params.id,
    lazy: false
}

const { data: detail ,pending,error } = await getArchivesDetail(query)
getDetail.value = detail ? JSON.parse(JSON.stringify(detail.value)) : false
console.log(getDetail.value)
const blockQuery = {
    limit : 10,
    page : 1,
    name : "wxappfocus",
    lazy: false
}
const {data:block} = await getBlock(blockQuery)
console.log(block);
const blockAd = block ? JSON.parse(JSON.stringify(block.value.rows)) : false

const topAd = ref([])
const bottomAd = ref([])
blockAd.forEach(item => {
  if (item.name === 'wxappfocus') {
    topAd.value.push(item)
  } else if (item.name === 'uniappfocus') {
    bottomAd.value.push(item)
  }
})

console.log(blockAd);
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
useHead({
        title: getDetail.value.archivesInfo.seotitle,
        meta: [
            { name: 'description', content: getDetail.value.archivesInfo.description },
            { name: 'keywords', content: getDetail.value.archivesInfo.keywords },
        ],
    })
</script>