<template>
  <div v-if="isLoading" class="loading">
    <v-progress-linear
      color="red accent-4"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>
  </div>  
</template>

<script setup>
  import { computed } from "vue";
  import {useStore} from 'vuex'

  const store = useStore();
  const isLoading = computed(()=> store.state.isLoading);
</script>

<style scoped>
  .loading{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>