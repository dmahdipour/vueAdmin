import axios from "@/utils/axios"
import {useToast} from "vue-toastification"

const toast = useToast();
export default{
    state:{
        categories:[],
    },
    mutations:{
        setCategories(state, categories){
            state.categories = categories;
        }
    },
    actions:{
        getCategoryById(context, id){
            context.commit("setLoading", true)
            return axios.get(`/api/category/${id}`)
            .finally(()=>{
                context.commit("setLoading", false)
            })
        },
        getCategories(context){
            context.commit("setLoading", true)
            return axios.get(`/api/category/`).then(res=>{
                context.commit("setCategories", res.data)
            })
            .catch(err=>{
                toast.error("مشکلی در عملیات رخ داده است")
            })
            .finally(()=>{
                context.commit("setLoading", false)
            })
        },
        deleteCategory(context, id){
            context.commit("setLoading", true)
            return axios.delete(`/api/category/${id}`)
            .finally(()=>{
                context.commit("setLoading", false)
            })
        },
        addCategory(context, category){
            context.commit("setLoading", true)
            return axios.post(`/api/category/`, category)
            .finally(()=>{
                context.commit("setLoading", false)
            })
        },
        editCategory(context, category){
            context.commit("setLoading", true)
            return axios.put(`/api/category/`, category)
            .finally(()=>{
                context.commit("setLoading", false)
            })
        }
    }
}