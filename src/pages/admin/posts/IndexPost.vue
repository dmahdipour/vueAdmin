<template>
  <div>
    <h1>لیست مطالب</h1>
    <hr>
    <v-btn @click="router.push({name: 'addPost'})" color="success">
        <v-icon
            right
            dark
        >
            mdi-plus
        </v-icon>
        افزودن
    </v-btn>

    <form @submit.prevent="filterPosts" class="elevation-4 py-4 px-4 my-7">
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field v-model="filter.title" lablel="عنوان"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <v-field-text type="number" v-model="filter.take" label="تعداد نمایش در صفحه"></v-field-text>
        </v-col>
      </v-row>
      <v-btn type="submit" color="info">فیلتر</v-btn>
    </form>

    <v-table class="mt-7 elevation-2">
      <thead>
        <tr>
          <th>عکس</th>
          <th>عنوان</th>
          <th>slug</th>
          <th>نویسنده</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for = "item in postFilter.posts" :key="item.id">
            <td>
              <img :src="`${PostImageUrl}${item.imageName}`" class="w-20 h-20" />
            </td>
            <td v-text="item.title"></td>
            <td v-text="item.slug"></td>
            <td v-text="item.userFullName"></td>
            <td>
              <v-btn @click="router.push({name:'editPost', params:{id:item.id}})" color="info">ویرایش</v-btn>
              <v-btn @click="deletePost(item.id)" color="error" class="mr-1">حذف</v-btn>
            </td>
          </tr>
          <tr v-if="postFilter.entityCount===0">
            <td colspan="5">هیچ مطلبی وجود ندارد.</td>
          </tr>
      </tbody>
    </v-table>

    <v-pagination
      v-if="postFilter && postFilter?.pageCount>0"
      v-model="filter.pageId"
      :length="postFilter.pageCount"
      :total-visible="7"
      next-icon="mdi-chevron-left"
      prev-icon="mdi-chevron-right"
    ></v-pagination>
  </div>
</template>

<script setup>
  import {computed, onMounted, reactive, watch} from 'vue'
  import { useRouter } from 'vue-router';
  import {useStore} from 'vuex'
  import { useToast } from 'vue-toastification';
  import {PostImageUrl} from '@/utils/imageUrls'
//  npm install sweetalert2
  //import Swal from 'sweetalert2'

  const store = useStore();
  const router = useRouter();
  const toast = useToast();

  const filter = reactive({pageId:1, take:20, title:''})
  const postFilter = computed(()=>store.state.postModule.postFilter)


  const filterPosts=()=>{
    filter.pageId=1;
    store.dispatch("getPostByFilter", filter)
  }
  
  const deletePost = (id)=>{
    // Swal.fire({
    //   title: 'آیا از حذف اطمینان دارید',
    //   // text: '',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   cancelButtonTxt: 'نه، بی خیال',
    //   confirmButtonText: 'بله، حذفش کن'
    // }).then((result)=>{
    //   if(result.confirm){
    //     store.dispatch("deletePost", id).then(res=> {
    //       if (res.status === 200) {
    //         toast.success('حذف با موفقیت انجام شد')
    //         store.dispatch("getPostByFilter")
    //       }
    //     })
    //   }
    // }).catch(err=>{
    //   if (err.response.data) {
    //     toast.error(err.response.data)
    //   }
    //   toast.error('مشکلی در عملیات رخ داده است')
    // });
  }

  watch(
    ()=>filter.pageId,
    ()=> {
      //store.dispatch("getPostByFilter", filter)
      filterPosts()
  })

  onMounted(async()=>{
    //store.dispatch("getPostByFilter", filter)
    filterPosts()
  })
</script>
