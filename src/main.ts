//Vueの基本設定ファイル。App.vueをhtmlに紐付ける。
import { createApp } from 'vue'
import axios from 'axios'
import * as mockData from './mocks'
import { router } from './router'

//1秒待ってから表示　resolveされるまでrenderしない App.vue　fallback
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
//@ts-ignore
axios.get = async (url: string) => {
    if(url === '/posts') {
        await delay(1000)
        return Promise.resolve( {
            data: [mockData.todayPost, mockData.thisWeek, mockData.thisMonth]
        })
    }
}

import App from './App.vue'
console.log(App)

//createApp(App).mount('#app')

const app = createApp(App)
app.use(router)

app.mount('#app')

