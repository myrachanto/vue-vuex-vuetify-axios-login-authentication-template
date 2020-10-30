import router from '../../router'

const state = {
    token: localStorage.getItem('access_token') || null,
    username: localStorage.getItem('username') || null,
    errs: {},
}
const getters ={
    loggedIn(state){
        return state.token != undefined
    },
    Token(state){
        return state.token
    },
    username: (state)=> state.username,
} 
const actions ={ 
        
}
const mutations = {
    
    newdata: (state, data) => {
        state.info.unshift(data),
        router.push('/login');
    },
    login: (state, data) => {
        (state.token = data.Token),
        (state.username = data.uname),
        router.push('/dashboard');
    }, 
    logout: (state)=> { 
        (state.token = null),
        (state.username = null),
        router.push('/login');
    },
    setError: (state, errs)=> {
        (state.errs = errs),
        (state.snackbar = true)
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}