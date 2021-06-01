<template>
    <nav class="is-primary panel">
        <p class="panel-tabs">
            <a v-for="period in periods" :key="period" data-test="period" 
            :class="[ period === selectPeriod ? 'is-active' : '']"
            @click="setPeriod(period)">
                {{ period }}
            </a>
        </p>
    </nav>
    <TimelinePost v-for="post in posts" :key="post.id" :post="post"/>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import moment from 'moment'
import TimelinePost from './TimelinePost.vue'
import { Period, Post } from './types'
import { useStore } from './store'

export default defineComponent({
    components: {
        TimelinePost
    },
    async setup() {
        const periods: Period[] = ['today', 'this week', 'this month']
        const selectPeriod = ref<Period>('today')

        //flux store使用
        const store = useStore()
        if(!store.getState().posts.loaded){
            await store.fetchPosts()
        }
        const allPosts = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
            const post = store.getState().posts.all[id]
            //結合して[]に全てのポストがpushされる
            return acc.concat(post)
        }, [])

        const posts = computed(() => allPosts.filter(post =>{
            if(
                selectPeriod.value === 'today' && 
                post.created.isAfter(moment().subtract(1, 'day'))
            ){
                return true
            } 

            if(
                selectPeriod.value === 'this week' && 
                post.created.isAfter(moment().subtract(7, 'week'))
            ){
                return true
            }

            if(
                selectPeriod.value === 'this month' && 
                post.created.isAfter(moment().subtract(1, 'month'))
            ){
                return true
            }

                return false
            })
        )

        const setPeriod = (period: Period) => {
            selectPeriod.value = period
        }

        return {
            periods,
            selectPeriod,
            setPeriod,
            posts
        }
    },
})
</script>
