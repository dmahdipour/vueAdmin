<template>
  <div>
    <h1>لیست دسته بندی ها</h1>
    <hr>
    <v-btn @click="router.push({name: 'addCategory'})" color="success">
        <v-icon
            right
            dark
        >
            mdi-plus
        </v-icon>
        افزودن
    </v-btn>
    <v-table class="mt-4 elevation-2">
      <thead>
        <tr>
          <th>#</th>
          <th>عنوان</th>
          <th>slug</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for = "item in categories" :key="item.id">
            <td v-text="item.id"></td>
            <td>
              <span>{{ item.title }}</span>
              <span v-if="item.parentId>0"> -> {{ item.id }}</span>
            </td>
            <td>{{ item.slug }}</td>
            <td>
              <v-btn @click="deleteCategory(item.id)" color="error" class="ml-2">حذف</v-btn>
              <v-btn @click="router.push({name:'editCategory', params:{id:item.id}})" color="info">ویرایش</v-btn>
              <v-btn v-if="item.parentId===0" @click="router.push({name:'addCategory', params:{parentId:item.id}})" color="primary">
                افزودن زیرگروه
              </v-btn>
            </td>
          </tr>
          <tr v-if="categories.count===0">
            <td colspan="4">هیچ دسته بندی وجود ندارد.</td>
          </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
  import {computed, onMounted} from 'vue'
  import { useRouter } from 'vue-router';
  import {useStore} from 'vuex'
  import { useToast } from 'vue-toastification';
//  npm install sweetalert2
  import Swal from 'sweetalert2'

  const store = useStore();
  const router = useRouter();
  const toast = useToast();
  
  const categories = computed(()=> store.state.categoryModule.categories);

  const deleteCategory = (id)=>{
    Swal.fire({
      title: 'آیا از حذف اطمینان دارید',
      // text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonTxt: 'نه، بی خیال',
      confirmButtonText: 'بله، حذفش کن'
    }).then((result)=>{
      if(result.confirm){
        store.dispatch("deleteCategory", id).then(res=> {
          if (res.status === 200) {
            toast.success('حذف با موفقیت انجام شد')
            store.dispatch("getCategories")
          }
        })
      }
    }).catch(err=>{
      if (err.response.data) {
        toast.error(err.response.data)
      }
      toast.error('مشکلی در عملیات رخ داده است')
    });
  }
  onMounted(async()=>{
    store.dispatch("getCategories")
  })
</script>
