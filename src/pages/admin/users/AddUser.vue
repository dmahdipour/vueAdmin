<template>
  <h1>افزودن کاربر</h1>
  <hr>
  <v-form ref="form">
    <v-row>
        <v-col cols="12">
            <v-text-field 
                :rules="[
                    v => !!v || 'نام و نام خانوادگی را وارد کنید',
                    v => (v && v.length <= 20) || 'حداکثر باید ۱۰ کاراکتر باشد',
                ]"
                v-model="fullName"
                label="نام و نام خانوادگی">
            </v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="6">
            <v-text-field
                :rules="[
                    v => !!v || 'نام کاربری را وارد کنید',
                    v => (v && v.length >= 3) || 'حداقل باید ۳ کاراکتر باشد',
                ]"
                 v-model="userName"
                 label="نام کاربری">
            </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
                :rules="[
                    v => !!v || 'رمز عبور را وارد کنید',
                    v => (v && v.length > 3) || 'حداقل باید ۳ کاراکتر باشد',
                ]"
                v-model="password"
                label="کلمه عبور">
            </v-text-field>
        </v-col>
    </v-row>
    <v-btn @click="addUser" color="success" class="float-left">ثبت اطلاعات</v-btn>
  </v-form>
</template>

<script setup>
    import {ref} from 'vue'
    import {useStore} from 'vuex'
    import { useToast } from 'vue-toastification';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const toast = useToast();
    const router = useRouter();

    const form = ref(null);
    const fullName = ref("")
    const userName = ref("")
    const password = ref("")


    const addUser = () => {
        form.value.validate().then(res=>{
            if(res.valid){
                store.dispatch("addUser",{
                    fullName: fullName.value,
                    userName: userName.value,
                    password: password.value
                }).then(res=>{
                    if(res.status===200){
                        toast.success('عملیات با موفقیت انجام شد')
                        router.push({name:'users'})
                    }
                }).catch(err=>{
                    toast.error(`مشکلی در عملیات رخ داد: ${err.response.data}`)
                })
            }
        })
    }
</script>
