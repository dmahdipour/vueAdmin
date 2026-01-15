<template>
    <div>
        <h1>پربازدیدترین مطالب</h1>
        <v-row>
            <v-col cols="12" md="4" v-for="item in posts" :key="item.postId">
            <PostCard :post="item"></PostCard>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
  import {onMounted, ref} from 'vue'
  import {GetPopularPosts} from "@/services/PostService"
  import { useToast } from 'vue-toastification'
  import PostCard from '@/components/PostCard.vue';

  const toast = useToast();
  const posts= ref([])
  // const posts = ref([{postId:1, title:"test", imageName:"/asdasda/a.jpg"},{postId:2, title:"test1", imageName:"/asdasda/a1.jpg"}])

  onMounted(()=>{
    GetPopularPosts()
    .then(res=>{
      if(res.status===200){
        posts.value = res.data
      }
    })
    .catch(err=>{
    })
  })
</script>
