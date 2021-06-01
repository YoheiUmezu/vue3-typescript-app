<template>
    <a class="panel-block" data-test="post">
        <div>
            <a>{{ post.title }}</a>
            <div>{{ post.created.format('Do MM') }}</div>
        </div>
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Post } from './types'

export default defineComponent({
    props: {
        post: {
            type: Object as () => Post,
            required: true
        }
    },
    setup() {
        
    },
})
</script>
