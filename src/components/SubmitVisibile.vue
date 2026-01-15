<template>
  <div>
    <v-btn type="submit" :disabled="isLoading" color="success" class="float-left">
      <slot>ثبت اطلاعات</slot>
    </v-btn>
  </div>  
</template>

<script setup>
  import { computed } from "vue";
  import {useStore} from 'vuex'

  const store = useStore();
  const isLoading = computed(()=> store.state.isLoading);
</script>
