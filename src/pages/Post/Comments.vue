<template>
  <div>
    <div>
        <v-form @submit.prevent="sendComment">
            <v-textarea 
                v-model="commentText"
                label="نظر خود را وارد کنید"
                :rules="[v=>!!v||'متن نظر را وارد کنید']"
            ></v-textarea>
            <SubmitVisibile>ثبت نظر</SubmitVisibile>
        </v-form>
        <v-divider></v-divider>
        <div v-if="comments.length>0">
            <div v-for="item in comments" :key="item.id" class="pa-2 elevation-2">
                <h4>
                    {{ item.userFullName }}
                    <small>{{ new Date(item.creationDate).toLocaleDateString('fa-IR') }}</small>
                </h4>
                <p class="pr-4 text-pre-wrap">{{ item.text }}</p>
            </div>
        </div>
        <v-alert 
            v-else 
            border
            color="info"
        >
        برای این پست نظری ثبت نشده است
        </v-alert>
    </div>
  </div>
</template>

<script setup>
    import { onMounted, toRef } from 'vue';
    import SubmitVisibile from '@/components/SubmitVisibile.vue';
    import {DeleteComments, AddComment, GetComments} from '@/services/CommentsService'
    import { useToast } from 'vue-toastification';
    import { useStore } from 'vuex';

    const toast = useToast();
    const store = useStore();
    const props = defineProps(['PostId']);
    const postId = toRef(props, postId);
    const form = ref()
    const comments = ref([]);
    const commentText=ref("")

    const sendComment = async() => {
        const result = await form.value.vailate();
        if(result.valide===false){
            toast.error('اطلاعات نامعتبر است')
            return;
        }
        AddComment({text:commentText.value, postId:postId.value, userId:1})
        .then(res=>{
            if (res.status===200) {
                toast.success('عملیات با م،فقیت انجام شد.')
            }
            getPostComments()
        })
    }

    const getPostComments = () => {
        GetComments(postId.value)
        .then(res=>{
            if (res.status===200) {
                comments.value = res.data
            }
        })
    }

    onMounted(()=>{
        getPostComments()
    })
</script>

<style>

</style>