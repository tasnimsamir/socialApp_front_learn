import axios from "axios";

const state = {
  friends: null, //list of objects
  suggestedAcc:null, //list of non-friends accounts
  friendrequests:null, //list of friend requests
  profile_id:null,
  myfriendrequests:null,
  profile:{'name':'',
  'email': '',
  'zipcode':'',
  'birthdate': '',
  'gender':'',
  'friends':null}
}

const getters = {
  StateFriends: (state) => state.friends,
  StateSuggested: (state) => state.suggestedAcc,
  StateProfileId: (state) => state.profile_id,
  StateProfile: (state) => state.profile,
  StateFriendRequests: (state) => state.friendrequests,
  StateMyFriendRequests: (state) => state.myfriendrequests,
  
};

const actions = {
  async GetFriendsAccounts({commit},userids) { //userid: list of ids
    // console.log('Inside GetFriendsAccounts')
    const friendAcc = [];
    for (let i=0; i < userids.length; i++){
        let account = await axios.get(`accounts/${userids[i]}/`);
        // console.log('Inside GetFriendsAccounts',account.data),
        friendAcc.push(account.data);
    }
    commit("setFriendsAccounts", friendAcc);
  },

  async GetMyFriendRequestsAccounts({commit}) { //userid: list of ids
    // console.log('Inside GetMyFriendRequestsAccounts')
    const friendReqAcc = [];
    let userids = this.getters.StateFriendRequests.filter(x => x.to_user===this.getters.StateUserId).map(({from_user})=>from_user)
    for (let i=0; i < userids.length; i++){
        let account = await axios.get(`accounts/${userids[i]}/`);
        // console.log('Inside GetFriendsAccounts',account.data),
        friendReqAcc.push(account.data);
    }
    commit("setMyFriendReqAccounts", friendReqAcc);
  },

  async GetProfile({ commit },userid) {
    const response = await axios.get(`accounts/${userid}/`);
    // console.log('Inside Get Account',response.data)
    commit("setprofileDetails", response.data);
  },

  async GetsuggestedAccounts({commit},ids) { //ids: list of friends ids
    // console.log('Inside GetsuggestedAccounts')
    ids.push(this.getters.StateUserId)//push my id to the list to be excluded
    const suggestedAcc = [];
    let accounts = await axios.get(`accounts/`); //all accounts: accounts.data
    let accs = Object.values(accounts.data)
    for (let i=0; i < accs.length; i++){
      if ((ids.includes(accs[i].id) === false)){
        suggestedAcc.push(accs[i])}
    }
    // console.log(suggestedAcc)
    commit("setSuggestedAccounts", suggestedAcc);
  },

  async makeFriendRequest({dispatch},to_user_id){   
    await axios.post("friends/",{to_user:to_user_id,is_sent:true},{headers:{ Authorization: `token ${this.getters.StateUsertoken}`}});
    // console.log('Inside Make FriendRequest',response.data)
    return await dispatch("GetfriendRequests");
  },
  async DeleteFriendRequest({dispatch},to_user_id) {
    let frndRqst_url = `friends/from:${to_user_id}/to:${this.getters.StateUserId}/`
    console.log(frndRqst_url)
    await axios.delete(frndRqst_url,{to_user:to_user_id,is_sent:false});
    return await dispatch("GetfriendRequests");
  },
  async AcceptFriendRequest({},to_user_id) {
    const account1 = await axios.get(`accounts/${this.getters.StateUserId}/`);
    const account2 = await axios.get(`accounts/${to_user_id}/`);
    console.log('ACCOUNT1: ',account1.data.friends)
    console.log('ACCOUNT2: ',account2.data)
    // account1.data.friends.add(account2.data.id)
    // console.log('AFTER ADDING: ', account1.data.friends)
  },
  async GetfriendRequests({ commit }) {
    const response = await axios.get("friends/");
    commit("setfriendrequests", response.data);
  },
};

const mutations = {
  setFriendsAccounts(state,friendAcc){
      state.friends = friendAcc
  },
  setProfileid(state,profile_id){
    state.profile_id = profile_id
  },
  setprofileDetails(state,profile){
    Object.keys(state.profile).forEach(key => {
      state.profile[key] = profile[key];
    });
  },
  setSuggestedAccounts(state,suggestedAcc){
    state.suggestedAcc = suggestedAcc
  },
  setfriendrequests(state,friendrequests){
    state.friendrequests = friendrequests

  },
  setMyFriendReqAccounts(state,myfriendrequests){
    state.myfriendrequests = myfriendrequests

  },


};

export default {
  state,
  getters,
  actions,
  mutations,
};
