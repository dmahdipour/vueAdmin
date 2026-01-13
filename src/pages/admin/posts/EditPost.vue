<template>
    <div>
        <h1>ویرایش مطلب</h1>
        <hr>
        <v-form 
            ref="form"
            lazy-validation
            @submit.prevent="editPost"
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

                <v-col cols="12" md="6">
                    <img :src="`${PostImageUrl}${imageName}`" class="w-100 h-100" />
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
    import { PostImageUrl } from '@/utils/imageUrls';

    const store = useStore();
    const toast = useToast();
    const router = useRouter();

    const form = ref(null);
    const postData = reactive({
        postId: 0,
        categoryId: 0,
        subCategoryId: 0,
        title: "",
        slug: "",
        description: "",
        isSpecial: false,
        images
    })
    const files = ref(null);

    const categories = computed(()=>store.state.categoryModule.categories)
    const subCategories = ref([]);

    watch(()=>postData.categoryId,
        ()=>{
            subCategories.value = categories.value.filter(f=>f.parentId === postData.categoryId)
        }
    )


    const editPost = async() => {
        const result = await form.value.validate();
        
        if(result.valid===false){
            toast.error("اطلاعات نامعتبر است.");
            return;
        }

        const formData = new formData();
        formData.append("PostId", postData.postId.toString())
        formData.append("CategoryId", postData.categoryId.toString())
        formData.append("SubCategoryId", postData.subCategoryId.toString())
        formData.append("Title", postData.title.toString())
        formData.append("Slug", postData.slug.toString())
        if(files.value.length> 0) formData.append("ImageFile", files.value[0])
        formData.append("Description", postData.description)
        formData.append("IsSpecial", postData.isSpecial.toString())

        if(postData.postId<=0 || postData.categoryId<=0){
            toast.error("اطلاعات نامعتبر است.");
            return;
        }

        store.dispatch("editPost", formData).then(res=>{
            if(res.status===200){
                toast.success('عملیات با موفقیت انجام شد')
                router.push({name:'posts'})
            }
        }).catch(err=>{
            toast.error(`مشکلی در عملیات رخ داد`)
        })
    }

    onMounted(async()=>{
        const postId = router.currentRoute.value.params.id;
        if (!postId) {
            router.push({name:"posts"});
        }

        const result = await store.dispatch("getPostById", postId)
        if (result.state===200) {
            postData.title = res.data.title
            postData.slug = res.data.slug
            postData.categoryId = res.data.categoryId
            postData.subCategoryId = res.data.subCategoryId
            postData.description = res.data.description
            postData.isSpecial = res.data.isSpecial
            postData.images = res.data.imageName
        }
        
        if(!user || user.userId===undefined){
            toast.error("چنین کاربری یافت نشد.")
            router.push({name:"posts"});
        }
        fullName.value = user.fullName;
        role.value = user.role;


        await store.dispatch("getCategories")
    });
</script>
