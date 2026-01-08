<template>
  <div>
    <h1>لیست کاربران</h1>
    <hr>
    <v-btn @click="router.push({name: 'addUser'})" color="success">افزودن</v-btn>
    <v-table class="mt-4 elevation-2">
      <thead>
        <tr>
          <th>نام کاربری</th>
          <th>نام و نام خانوادگی</th>
          <th>نقش</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for = "user in userFilter.users" :key="user.userId">
            <td>{{ user.userName }}</td>
            <td>{{ user.fullName }}</td>
            <td>
              <span v-if="user.role===1">مدیر</span>
              <span v-if="user.role===0">کاربر</span>
            </td>
            <td>
              <v-btn @click="router.push({name:'editUser', params:{id:user.userId}})" color="info">ویرایش</v-btn>
            </td>
          </tr>
          <tr v-if="userFilter.entityCount===0">
            <td colspan="4">هیچ کاربری وجود ندارد.</td>
          </tr>
      </tbody>
    </v-table>
    <span>تعداد کل:  {{ userFilter.entityCount }}</span>
    <span>تعداد صفحه:  {{ userFilter.pageCount }}</span>
    <span> currentPage:  {{ userFilter.currentPage }}</span>
    <span> startPage:  {{ userFilter.startPage }}</span>
    <span> endPage:  {{ userFilter.endPage }}</span>
    <span> take:  {{ userFilter.take }}</span>
  </div>
</template>

<script setup>
  import router from '@/router';
  import {computed, onMounted} from 'vue'
  import {useStore} from 'vuex'

  const store = useStore();
  
  const userFilter = computed(()=> store.state.userModule.usersFilter);

  onMounted(async()=>{
    store.dispatch("getUsers", {pageId:1, take:10})
  })
</script>
