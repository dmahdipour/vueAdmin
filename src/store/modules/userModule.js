
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
        getUsers(contex,{pageId, take}){
            contex.commit("setLoading", true);
            axios.get(`/api/user?pageId=${pageId}&take=${take}`).then(res=>{
                contex.commit("setUsers", res.data)
            }).catch(err => {

            }).finally(()=>{
                contex.commit("setLoading", false);
            })
        },
        
        getUserById(contex, userId){
            contex.commit("setLoading", true);
            axios.get(`/api/user/${userId}`).then(res=>{
                contex.commit("setSingleUser", res.data)
            }).catch(err => {

            }).finally(()=>{
                contex.commit("setLoading", false);
            })
        },

        addUser({commit}, user){
            commit("setLoading", true);
            return axios.post("/api/user", user).finally(()=>{
                commit("setLoading", false);
            })
        }
    }
}