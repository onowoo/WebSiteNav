import { defineStore } from 'pinia'



export const useMenuList = defineStore('menu', {
  state: () => ({
    catList: []
  }),
})
