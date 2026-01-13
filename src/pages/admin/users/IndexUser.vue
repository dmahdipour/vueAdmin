<template>
  <div>
    <h1>لیست کاربران</h1>
    <hr>
    <v-btn @click="router.push({name: 'addUser'})" color="success">
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
          <th>نام کاربری</th>
          <th>نام و نام خانوادگی</th>
          <th>نقش</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for = "item in userFilter.users" :key="item.userId">
            <td>{{ item.userName }}</td>
            <td>{{ item.fullName }}</td>
            <td>
              <span v-if="item.role===1">مدیر</span>
              <span v-if="item.role===0">کاربر</span>
            </td>
            <td>
              <v-btn @click="router.push({name:'editUser', params:{id:item.userId}})" color="info">ویرایش</v-btn>
            </td>
          </tr>
          <tr v-if="userFilter.entityCount===0">
            <td colspan="4">هیچ کاربری وجود ندارد.</td>
          </tr>
      </tbody>
    </v-table>

    <v-pagination
      v-if="userFilter && userFilter?.pageCount>0"
      v-model="pageId"
      :length="userFilter.pageCount"
      :total-visible="7"
      next-icon="mdi-chevron-left"
      prev-icon="mdi-chevron-right"
    ></v-pagination>
  </div>
</template>

<script setup>
  import {computed, onMounted, watch} from 'vue'
  import {useStore} from 'vuex'

  const store = useStore();
  const pageId=ref(1);
  
  const userFilter = computed(()=> store.state.userModule.usersFilter);

  watch(pageId, ()=>{
    store.dispatch("getUsers", {pageId:pageId.value, take:10})
  })

  onMounted(async()=>{
    store.dispatch("getUsers", {pageId:pageId.value, take:10})
  })
</script>
