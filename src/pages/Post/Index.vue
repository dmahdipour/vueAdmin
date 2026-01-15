<template>
    <div v-if="post.postId" class="elevation-8 pr-0 pl-0 pt-0 pb-5 v-container">
        <img :src="`${PostImageUrl}${post.imageName}`">
        <div class="pr-4 pl-4">
            <h1>{{ post.title }}</h1>
            <p class="text-pre-wrap">{{ post.description }}</p>
        </div>
        <v-divider></v-divider>
        <Comments :postId="post.postId"></Comments>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import {GetPostBySlug} from '@/services/PostService'
    import { useRouter } from 'vuetify/lib/composables/router';
    import { PostImageUrl } from '@/utils/imageUrls';
    import Comments from '@/pages/Post/Comments.vue';


    const router = useRouter()

    const post = ref({})


    onMounted(()=>{
        const slug = router.currentRoute.params.slug;
        GetPostBySlug(slug)
        .then(res=>{
            if (res.status===200) {
                post.value = res.data
            }
            else{
                router.back();
            }
        })
        .catch(()=>{
            router.back();
        })
    })
</script>

<style>

</style>