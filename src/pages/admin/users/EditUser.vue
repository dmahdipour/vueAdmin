<template>
    <div>
        <h1>ویرایش کاربر</h1>
        <hr>
        <v-form ref="form">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        :rules="[
                            v => !!v || 'نام و نام خانوادگی را وارد کنید',
                            v => (v && v.length <= 20) || 'حداکثر باید ۱۰ کاراکتر باشد',
                        ]"
                        v-model="fullName"
                        label="نام و نام خانوادگی">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-radio-group 
                        inline
                        v-model="role"
                    >
                        <v-radio label="مدیر" :value="1"></v-radio>
                        <v-radio label="کاربر" :value="0"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-btn @click="editUser" color="success" class="float-left">ویرایش اطلاعات</v-btn>
        </v-form>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue'
    import {useStore} from 'vuex'
    import { useToast } from 'vue-toastification';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const toast = useToast();
    const router = useRouter();

    const form = ref(null);
    let fullName = ref(null);
    let userId = ref(null);
    let role = ref(null);
    

    const editUser = () => {
        form.value.validate().then(res=>{
            if(res.valid){
                store.dispatch("editUser",{
                    fullName: fullName.value,
                    userId: userId.value,
                    role: role.value
                }).then(res=>{
                    if(res.status===200){
                        toast.success('عملیات با موفقیت انجام شد')
                        router.push({name:'users'})
                    }
                }).catch(err=>{
                    toast.error(`مشکلی در عملیات رخ داد`)
                })
            }
        })
    }


    onMounted(async()=>{
        userId.value = router.currentRoute.value.params.id;
        if (!userId.value) {
            router.push({name:"users"});
        }
        await store.dispatch("getUserById", userId.value);
        const user = await store.state.userModule.singleUser;
        
        if(!user || user.userId===undefined){
            toast.error("چنین کاربری یافت نشد.")
            router.push({name:"users"});
        }
        fullName.value = user.fullName;
        role.value = user.role;
    });
</script>
