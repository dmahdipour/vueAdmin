<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="/">بلاگ من </router-link>
        </v-toolbar-title>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text" @click="isSearchDisplay=!isSearchDisplay"></v-btn>
          <v-text-field 
            v-if="isSearchDisplay" 
            v-model="searchText"
            placeholder="جستجو" 
            @keydown.enter="search"
            class="mt-10"
            ></v-text-field>
        </template>

        <v-btn icon="mdi-account" variant="text" @click="$router.push('/admin')"></v-btn>
      </v-app-bar>

      <v-navigation-drawer 
        v-model="drawer"
        location="right" 
        theme="dark"      
        permanent
      >
        <v-list color="transparent">
            <router-link v-for="item in categories" :key="item.id" to="`/search?categorySlug=${item.slug}`" v-slot="{isActive}">
              <v-list-item 
                :isActive=isActive 
                prepend-icon="mdi-view-dashboard" 
                :title="item.title" 
                v-ripple
              ></v-list-item>
            </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh;">
        <div class="px-6 py-6">
          <router-view v-slot="{Component}">
            <transition name="slide-fade">
              <Component :is="Component" />
            </transition>
          </router-view>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>


<script setup>
  import { onMounted, ref, watch } from 'vue'
  import {GetCategories} from '@/services/CategoryService'
  import { useStore } from "vuex"
  import { useRouter } from 'vue-router';

  
  const store = useStore();
  const router = useRouter();

  const drawer = ref(true)
  const group = ref(null)
  const categories = ref([])
  const isSearchDisplay = ref(false)
  const searchText = ref('')

  watch(group, () => {
    drawer.value = false
  })

  const search = () => {
    router.push({name:'searchPage', query:{q:searchText.value}})
  }

  onMounted(()=>{
    searchText.value = router.currentRoute.value.query.q
    if (searchText.value) {
      isSearchDisplay.value=true
    }
    store.commit("setLoading", true)
    GetCategories()
    .then(res=>{
      if (res.status===200) {
        categories=res.data
      }
    })
    .finally(()=>{
        store.commit("setLoading", false)
    })
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
