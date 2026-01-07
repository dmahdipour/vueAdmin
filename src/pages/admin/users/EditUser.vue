<template>
  <h1>ویرایش کاربر</h1>
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
    <v-btn @click="editUser" color="success" class="float-left">ویرایش اطلاعات</v-btn>
  </v-form>
</template>

<script setup>
    import {computed, ref, onMounted} from 'vue'
    import {useStore} from 'vuex'
    import { useToast } from 'vue-toastification';
    import { useRoute, useRouter } from 'vue-router';

    const store = useStore();
    const toast = useToast();
    const router = useRouter();
    const route = useRoute();

    

    const form = ref(null);
    
    const user = computed(()=>store.state.userModule.singleUser);
    const fullName = ref(user.value.fullName);
    const userName = ref(user.value.userName);
    const password = ref(user.value.password);
 


    // const editUser = () => {
    //     form.value.validate().then(res=>{
    //         if(res.valid){
    //             store.dispatch("editUser",{
    //                 fullName: fullName.value,
    //                 userName: userName.value,
    //                 password: password.value
    //             }).then(res=>{
    //                 if(res.status===200){
    //                     toast.success('عملیات با موفقیت انجام شد')
    //                     router.push({name:'users'})
    //                 }
    //             }).catch(err=>{
    //                 toast.error(`مشکلی در عملیات رخ داد: ${err.response.data}`)
    //             })
    //         }
    //         else{
    //             console.error("invalid")
    //         }
    //     })
    // }


    onMounted(async()=>{
        const userId = route.params.id;
        store.dispatch("getUserById", userId)
    });
</script>
