<template>
    <div>
        <h1>افزودن دسته بندی</h1>
        <hr>
        <v-form 
            ref="form"
            lazy-validation
            @submit.prevent="addCategory"
        >
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        :rules="[
                            v => !!v || 'نام دسته بندی را وارد کنید',
                            v => (v && v.length <= 20) || 'حداکثر باید ۲۰ کاراکتر باشد',
                        ]"
                        v-model="title"
                        label="عنوان">
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field 
                        :rules="[
                            v => !!v || 'Slug دسته بندی را وارد کنید',
                            v => (v && v.length <= 20) || 'حداکثر باید ۲۰ کاراکتر باشد',
                        ]"
                        v-model="slug"
                        label="Slug">
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field 
                        :rules="[
                            v => !!v || 'MetaTag دسته بندی را وارد کنید',
                            v => (v && v.length <= 20) || 'حداکثر باید ۲۰ کاراکتر باشد',
                        ]"
                        v-model="metaTag"
                        label="MetaTag">
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field 
                        :rules="[
                            v => !!v || 'MetaDescription دسته بندی را وارد کنید',
                            v => (v && v.length <= 20) || 'حداکثر باید ۲۰ کاراکتر باشد',
                        ]"
                        v-model="metaDescription"
                        label="MetaDescription">
                    </v-text-field>
                </v-col>
            </v-row>
            <SubmitVisibile />
        </v-form>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import {useStore} from 'vuex'
    import { useToast } from 'vue-toastification';
    import { useRouter } from 'vue-router';
    import SubmitVisibile from '@/components/SubmitVisibile.vue';

    const store = useStore();
    const toast = useToast();
    const router = useRouter();

    const form = ref(null);
    const title = ref("")
    const slug = ref("")
    const metaTag = ref("")
    const metaDescription = ref("")
    const parentId = ref(0)


    const addCategory = async() => {
        const result = await form.value.validate();
        
        if(result.valid===false){
            toast.error("اطلاعات نامعتبر است.");
            return;
        }

        parentId.value = router.currentRoute.value.query.parentId;
        if (parentId.value === undefined || !parentId.value) {
            parentId.value = 0;
        }

        store.dispatch("addCategory",{
            title: title.value,
            slug: slug.value,
            metaTag: metaTag.value,
            metaDescription: metaDescription.value,
            parentId: parentId.value,
        }).then(res=>{
            if(res.status===200){
                toast.success('عملیات با موفقیت انجام شد')
                router.push({name:'categories'})
            }
        }).catch(err=>{
            toast.error(`مشکلی در عملیات رخ داد`)
        })
    }
</script>
