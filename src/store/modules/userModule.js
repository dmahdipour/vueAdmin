
import axios from '@/utils/axios';

export default{
    state:{
        usersFilter:{},
        singleUser:{},
    },

    mutations:{
        setUsers(state, users){
            state.usersFilter = users;
        },
        setSingleUser(state, user){
            state.singleUser = user
        }
    },
    
    actions:{
        async getUsers(contex,{pageId, take}){
            try{
                contex.commit("setLoading", true);
                const res = await axios.get(`/api/user?pageId=${pageId}&take=${take}`);
                contex.commit("setUsers", res.data);
            }
            catch(err){

            }
            finally {
                contex.commit("setLoading", false);
            }
        },
        
        async getUserById(context, userId) {
            try {
                context.commit("setLoading", true);
                const res = await axios.get(`/api/user/${userId}`);
                context.commit("setSingleUser", res.data);
                return res.data;
            } catch (err) {

            } finally {
                context.commit("setLoading", false);
            }
        },

        async addUser({commit}, user){
            commit("setLoading", true);
            try {
                return await axios.post("/api/user", user);
            } finally {
                commit("setLoading", false);
            }
        },

        async editUser({commit}, user){
            commit("setLoading", true);
            try {
                return await axios.put("/api/user", user);
            } finally {
                commit("setLoading", false);
            }
        }
    }
}