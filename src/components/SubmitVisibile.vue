<template>
  <div>
    <v-btn type="submit" :disabled="isLoading" color="success" class="float-left">ثبت اطلاعات</v-btn>
  </div>  
</template>

<script setup>
  import { computed } from "vue";
  import {useStore} from 'vuex'

  const store = useStore();
  const isLoading = computed(()=> store.state.isLoading);
</script>
