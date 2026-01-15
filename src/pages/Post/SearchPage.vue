<template>
    <div>
        <h1> جستجو: 
            <small v-if="filter.title">{{ filter.title }}</small>
        </h1>
        <div v-if="!loading">
            <v-row v-if="postFilteredData.entityCount>0">
                <v-col cols="12" md="4" v-for="item in postFilteredData.posts" :key="item.postId">
                <PostCard :post="item"></PostCard>
                </v-col>
            </v-row>
            <v-alert v-else 
                color="red"
                class="text-center"
            >موردی برای نمایش وجود ندارد</v-alert>
            
            <v-pagination
                v-if="postFilteredData.pageCount>1"
                v-model="filter.pageId"
                :length="postFilteredData.pageCount"
                :total-visible="7"
                next-icon="mdi-chevron-left"
                prev-icon="mdi-chevron-right"
                class="mt-4"
            ></v-pagination>
        </div>
        <div v-else class="text-center">
            <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                indeterminate=""
            ></v-progress-circular>
        </div>
    </div>
</template>

<script setup>
    import PostCard from '@/components/PostCard.vue';
    import { onMounted, reactive, ref, watchEffect } from 'vue';
    import {GetPostByFilter} from '@/services/PostService';
    import { useRouter } from 'vue-router';


    const router = useRouter()

    const filter = reactive({pageId:1, take:10, title:'', categorySlug:''})
    const postFilteredData = ref({})
    const loading = ref(true)

    const filterPost = () => {
        loading.value=true
        GetPostByFilter(filter)
        .then(res=>{
            if (res.status===200) {
                postFilteredData.value=res.data
            }
        })
        .finally(()=>{
            loading.value=false
        })
    }

    watchEffect(()=> {
        filter.title=router.currentRoute.value.query.q
        filter.categorySlug=router.currentRoute.value.query.categorySlug
        filterPost()
    })

    onMounted(()=>{
        filterPost()
    })
</script>

<style>

</style>