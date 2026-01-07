<template>
  <v-app>
    <v-main>
      <api-loading ></api-loading>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
  import ApiLoading from "@/components/ApiLoading.vue";

</script>

<style>
  .v-application, .v-toolbar, .v-locale--is-ltr{
    direction: rtl !important;
  }
</style>
