import axios from "@/utils/axios"
import { useToast } from "vue-toastification"

const toast = useToast();

export const GetPopularPosts = async() => {
    try {
        return await axios.get('/api/post/popular');
    } catch (err) {
        toast.error('عملیات با شکست مواجه شد');
    }
}
export const GetPostBySlug = async(slug) => {
    try {
        return await axios.get(`/api/post/getBySlug/${slug}`);
    } catch (err) {
        toast.error('عملیات با شکست مواجه شد');
    }
}
export const GetPostByFilter = async({pageId, take, title, categorySlug}) => {
    try {
        return await axios.get(`/api/post`, {params:{pageId, take, title, categorySlug}});
    } catch (err) {
        toast.error('عملیات با شکست مواجه شد');
    }
}