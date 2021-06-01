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
import { todayPost, thisWeek, thisMonth } from './mocks'
import { useStore } from './store'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export default defineComponent({
    components: {
        TimelinePost
    },
    async setup() {
        const periods: Period[] = ['today', 'this week', 'this month']
        const selectPeriod = ref<Period>('today')

        const store = useStore()

        //2秒待ってから表示　resolveされるまでrenderしない
        await delay(2000)

        const posts = computed(() => [todayPost, thisWeek, thisMonth].filter(post =>{
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
