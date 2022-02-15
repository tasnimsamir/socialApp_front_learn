import axios from "axios";

const state = {
  accounts:null,//accounts: list of acconts objects
}

const getters = {
    StateAccounts: (state) => state.accounts,
  };
  

    
const actions = {
  async GetallAccounts({ commit }) {
    const response = await axios.get(`accounts/`);
    // console.log(response.data)
    commit("setallaccounts", response.data);
  },
};
const mutations = {
  setallaccounts(state, accounts) {//accounts: list of acconts objects
    state.accounts = accounts
   
  },

};


  export default {
    state,
    getters,
    actions,
    mutations,
  };
  