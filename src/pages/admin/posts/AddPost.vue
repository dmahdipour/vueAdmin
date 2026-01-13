<template>
    <div>
        <h1>افزودن مطلب</h1>
        <hr>
        <v-form
            class="elevation-7 px-3 pt-5 pb-12"
            ref="form"
            lazy-validation
            @submit.prevent="addPost"
        >
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        :rules="[
                            v => !!v || 'عنوان را وارد کنید',
                        ]"
                        
                        v-model="postData.title"
                        label="عنوان">
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field 
                        :rules="[
                            v => !!v || 'Slug را وارد کنید',
                        ]"
                        v-model="postData.slug"
                        label="Slug">
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                    <v-textarea
                        solo
                        :rules="[
                            v => !!v || 'توضیحات را وارد کنید',
                        ]"
                        v-model="postData.description"
                        label="توضیحات">
                    </v-textarea>
                </v-col>

                <v-col cols="12" md="6">
                    <v-switch
                        v-model="postData.isSpecial"
                        hide-details
                        color="primary"
                        lable="آیا این مطلب ویژه است؟"
                    ></v-switch>
                </v-col>  

                <v-col cols="12" md="6">
                    <v-select
                        :rules="[
                            v => !!v || 'نویسنده را وارد کنید',
                        ]"
                        v-model="postData.userId"
                        label="نویسنده">
                        <option v-for="item in userFilter.users" :key="item.userId" :value="item.userId">{{ item.fullName }}</option>
                    </v-select>
                </v-col>

                <v-col cols="12" md="6">
                    <v-select
                        :rules="[
                            v => !!v || 'دسته بندی را وارد کنید',
                        ]"
                        v-model="postData.categoryId"
                        label="دسته بندی">
                        <option v-for="item in categories.filter(f=>f.pageId===0)" :key="item.id" :value="item.id">{{ item.title }}</option>
                    </v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select
                        :rules="[
                            v => !!v || 'زیردسته بندی را وارد کنید',
                        ]"
                        v-model="postData.subCategoryId"
                        label="زیردسته بندی">
                        <option v-for="item in subCategories" :key="item.id" :value="item.id">{{ item.title }}</option>
                    </v-select>
                </v-col>
                
                <v-col cols="12" md="6">
                    <v-file-input
                        v-model="files"
                        accept="image/png, image/jpeg, image/bmp"
                        prepend-icon="mdi-camera"
                        show-size
                        lable="تصویر شاخص"
                    ></v-file-input>
                </v-col>
            </v-row>
            <SubmitVisibile />
        </v-form>
    </div>
</template>

<script setup>
    import {computed, onMounted, ref, watch} from 'vue'
    import {useStore} from 'vuex'
    import { useToast } from 'vue-toastification';
    import { useRouter } from 'vue-router';
    import SubmitVisibile from '@/components/SubmitVisibile.vue';

    const store = useStore();
    const toast = useToast();
    const router = useRouter();

    const form = ref(null);
    const postData = reactive({
        userId: 0,
        categoryId: 0,
        subCategoryId: 0,
        title: "",
        slug: "",
        description: "",
        isSpecial: false,
    })
    const files = ref(null);

    const userFilter = computed(()=>store.state.userModule.userFilter)
    const categories = computed(()=>store.state.categoryModule.categories)
    const subCategories = ref([]);

    watch(()=>postData.categoryId,
        ()=>{
            subCategories.value = categories.value.filter(f=>f.parentId === postData.categoryId)
        }
    )


    const addPost = async() => {
        const result = await form.value.validate();
        
        if(result.valid===false){
            toast.error("اطلاعات نامعتبر است.");
            return;
        }

        const formData = new formData();
        formData.append("UserId", postData.userId.toString())
        formData.append("CategoryId", postData.categoryId.toString())
        formData.append("SubCategoryId", postData.subCategoryId.toString())
        formData.append("Title", postData.title.toString())
        formData.append("Slug", postData.slug.toString())
        formData.append("ImageFile", files.value[0])
        formData.append("Description", postData.description)
        formData.append("IsSpecial", postData.isSpecial.toString())

        if(postData.userId<=0 || postData.categoryId<=0 || files.value.length===0){
            toast.error("اطلاعات نامعتبر است.");
            return;
        }

        store.dispatch("addPost", formData).then(res=>{
            if(res.status===200){
                toast.success('عملیات با موفقیت انجام شد')
                router.push({name:'posts'})
            }
        }).catch(err=>{
            toast.error(`مشکلی در عملیات رخ داد`)
        })
    }

    onMounted(()=>{
        store.dispatch("getUsers", {take:100, pageId:1})
        store.dispatch("getCategories")
    })
</script>
