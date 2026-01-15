import axios from "@/utils/axios"
import { useToast } from "vue-toastification"

const toast = useToast();

export const GetCategories = async() => {
    try {
        return await axios.get('/api/category');
    } catch (err) {
        toast.error('عملیات با شکست مواجه شد');
    }
}