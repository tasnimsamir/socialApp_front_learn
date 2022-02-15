import axios from "axios";

const state = {
  email: null,
  // admin_mail : 'tasnimsamir71@gmail.com',
  user_id: null,
  access_token:null,
  user:{'name':'',
        'email': '',
        'zipcode':'',
        'birthdate': '',
        'gender':'',
        'is_staff':'',
        'friends':null,},
  
  UserApproval:{
    'is_accepted':null,
    'is_accepted_message':null,
  }

  
}

const getters = {
  isAuthorized: (state) => !!state.user.is_staff,
  isAuthenticated: (state) => !!state.email,
  StateUser: (state) => state.user,
  StateUserApproval: (state) => state.UserApproval,
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
    await commit('setUser', {'email':user.get('email'),"token":response.data.token,'userid':response.data.id})
    return await dispatch("GetAccount",this.getters.StateUserId); 
  },

  async GetAccount({ commit },userid) {
    const response = await axios.get(`accounts/${userid}/`);
    // console.log('Inside Get Account',response.data)
    commit("setuserDetails", response.data);
    commit("setuserApprovalDetails", response.data);
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
    // console.log('Inside setUserDetails',this.getters.StateUser)
  },
  setuserApprovalDetails(state,user){
    Object.keys(state.UserApproval).forEach(key => {
      state.UserApproval[key] = user[key];
    });
    // console.log('Inside setuserApprovalDetails',this.getters.StateUserApproval)
  },
  // setupdateApprovalDetails(state,user){
  //   Object.keys(state.UserApproval).forEach(key => {
  //     state.UserApproval[key] = user[key];
  //   });
  //   // console.log('Inside setuserApprovalDetails',this.getters.StateUserApproval)
  // },

  logout(state) {
    state.email = null
    // state.posts = null
    // state.comments = null
    // state.likes = null
    state.access_token = null
    state.user_id = null
    // state.user = {}
    // state.UserApproval = {}
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
