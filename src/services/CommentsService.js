import axios from "@/utils/axios"
import { useToast } from "vue-toastification"

const toast = useToast();

export const GetComments = async(postId) => {
    try {
        return await axios.get('/api/comment', {params:{postId}});
    } catch (err) {
        // toast.error('عملیات با شکست مواجه شد');
    }
}
export const AddComment = async(comment) => {
    try {
        return await axios.post('/api/comment', comment);
    } catch (err) {
        // toast.error('عملیات با شکست مواجه شد');
    }
}
export const DeleteComments = async(commentId) => {
    try {
        return await axios.delete(`/api/comment/${commentId}`);
    } catch (err) {
        // toast.error('عملیات با شکست مواجه شد');
    }
}