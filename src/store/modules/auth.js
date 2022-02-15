import axios from "axios";

const state = {
  email: null,
  user_id: null,
  access_token:null,
  user:{'name':'',
        'email': '',
        'zipcode':'',
        'birthdate': '',
        'gender':'',
        'friends':null}
  
}

const getters = {
  isAuthenticated: (state) => !!state.email,
  StateUser: (state) => state.user,
  StateUserEmail: (state) => state.email,
  StateUserId: (state) => state.user_id,
  StateUsertoken: (state) => state.access_token,
};
const actions = {
  async Register({dispatch}, form) {
    await axios.post('signup', form)
    let UserForm = new FormData()
    UserForm.append('email', form.email)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },

  async LogIn({commit,dispatch}, user) {
    let response = await axios.post("signin", user)
    // console.log('Done!')
    await commit('setUser', {'email':user.get('email'),"token":response.data.token,'userid':response.data.id})
    // console.log('Done!')
    return await dispatch("GetAccount",this.getters.StateUserId);
    
  },

  async GetAccount({ commit },userid) {
    const response = await axios.get(`accounts/${userid}/`);
    // console.log('Inside Get Account',response.data)
    commit("setuserDetails", response.data);
  },



  async LogOut({ commit }) {
    commit("logout");
  },
};

const mutations = {
  setUser(state, user) {
    state.email = user.email;
    state.access_token = user.token;
    state.user_id = user.userid;
   
  },
  setuserDetails(state,user){
    Object.keys(state.user).forEach(key => {
      state.user[key] = user[key];
    });
    // console.log('Inside setUserDetails',state.user)
  },

  logout(state) {
    state.email = null
    // state.posts = null
    // state.comments = null
    // state.likes = null
    state.access_token = null
    state.user_id = null
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
