<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>پنل ادمین با vue</v-toolbar-title>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-home" variant="text" @click="$router.push('/')"></v-btn>
        </template>

        <v-btn icon="mdi-chevron-left" variant="text" @click="$router.back()"></v-btn>
      </v-app-bar>

      <v-navigation-drawer 
        v-model="drawer"
        location="right" 
        theme="dark"      
        permanent
      >
        <v-list color="transparent">
            <router-link to="/admin" v-slot="{isExactActive}">
              <v-list-item
                :active="isExactActive"
                prepend-icon="mdi-view-dashboard" 
                title="داشبورد" 
                v-ripple
              ></v-list-item>
            </router-link>
            <router-link to="/admin/users" v-slot="{isActive}">
              <v-list-item
                :active="isActive" 
                prepend-icon="mdi-forum" 
                title="مدیریت کاربران" 
                v-ripple
              ></v-list-item>
            </router-link>
            <router-link to="/admin/categories" v-slot="{isActive}">
              <v-list-item
                :active="isActive" 
                prepend-icon="mdi-card-outline" 
                title="مدیریت دسته بندی ها" 
                v-ripple
              ></v-list-item>
            </router-link>
            <router-link to="/admin/posts" v-slot="{isActive}">
              <v-list-item
                :active="isActive" 
                prepend-icon="mdi-file-outline" 
                title="مدیریت مطالب" 
                v-ripple
              ></v-list-item>
            </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh;">
        <div class="px-6 py-6">
          <router-view></router-view>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>


<script setup>
  import { ref, watch } from 'vue'
  

  const drawer = ref(true)
  const group = ref(null)

  watch(group, () => {
    drawer.value = false
  })
</script>


<style scoped>
  a{
      color:white;
      text-decoration:none;
  }
  .v-list-item--active{
    color: white !important
  }
</style>
