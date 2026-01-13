import axios from "@/utils/axios"
import {useToast} from "vue-toastification"

const toast = useToast();
export default{
    state:{
        postFilter:[],
    },
    mutations:{
        setPostFilter(state, postFilter){
            state.postFilter = postFilter;
        }
    },
    actions:{
        getPostById(context, id){
            context.commit("setLoading", true)
            return axios.get(`/api/posts/${id}`)
            .finally(()=>{
                context.commit("setLoading", false)
            })
        },
        getPostBySlug(context, slug){
            context.commit("setLoading", true)
            return axios.get(`/api/posts/${slug}`)
            .finally(()=>{
                context.commit("setLoading", false)
            })
        },
        getPostByFilter(context, {pageId, take, title}){
            context.commit("setLoading", true)
            return axios.get(`/api/post/`, {params:{pageId, take, title}})
            .then(res=>{
                if (res.status===200) {
                    context.commit("setPosts", res.data)
                }
            })
            .catch(err=>{
                toast.error("مشکلی در عملیات رخ داده است")
            })
            .finally(()=>{
                context.commit("setLoading", false)
            })
        },
        deletePost(context, id){
            context.commit("setLoading", true)
            return axios.delete(`/api/post/${id}`)
            .finally(()=>{
                context.commit("setLoading", false)
            })
        },
        addPost(context, post){
            context.commit("setLoading", true)
            return axios.post(`/api/post/`, category)
            .finally(()=>{
                context.commit("setLoading", false)
            })
        },
        editPost(context, post){
            context.commit("setLoading", true)
            return axios.put(`/api/post/`, category)
            .catch(err=>{
                if (err.response.data) {
                    toast.error(err.response.data)
                }else{
                    toast.error('عملیات با شکست مواجه شد.')
                }
            })
            .finally(()=>{
                context.commit("setLoading", false)
            })
        }
    }
}