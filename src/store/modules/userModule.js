
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
            axios.get(`/api/user?pageId=${pageId}&take=${take}`).then(res=>{
                contex.commit("setUsers", res.data)
            }).catch(err => {

            })
        },
        getUserById(contex, userId){
            axios.get(`/api/user/${userId}`).then(res=>{
                contex.commit("setSingleUser", res.data)
            }).catch(err => {

            })
        }
    }
}