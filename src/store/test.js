export default{
    namespaced: true,
    state(){
        return{
            count:0
        }
    },
    mutations:{
        incr(state, counter){
            state.count+=counter;
        }
    }
}