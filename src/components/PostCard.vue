<template>
    <v-card>
        <v-img
            :src="`${PostImageUrl}${props.post.imageName}`"
            class="white--text rgba(0,0,0,0.1), rgba(0,0,0,0.5)"
            height="200px"
            style="width: 100%"
            cover    
        >
        </v-img>
        <v-card-actions class="pb-5" style="display: block !important;">
            <v-spacer></v-spacer>
            <h3 class="text-white"> {{ props.post.title }} <small>{{ props.post.category?.title }}</small></h3>
            <v-btn
                class="mt-4"
                variant="outline"
                style="float:left"
                @click="$route.push({name:'singlePost', params:{slug:props.post.slug}})"
            >
            ادامه مطلب
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
    import { PostImageUrl } from '@/utils/imageUrls';

    const props = defineProps({
        post:{
            type: Object
        }
    })
</script>