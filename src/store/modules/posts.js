import axios from "axios";

const state = {
  posts: null,
  comments: null,
  likes : null,
  postaccount:null,
  
}

const getters = {
  StatePosts: (state) => state.posts,
  StateComments: (state) => state.comments,
  StateLikes: (state) => state.likes,
  StatePostAccount: (state) => state.postaccount,
  postById: (state) => (id) => {
      // cast both to Number() to prevent unexpected type-mismatch
      // console.log(id)
      return state.posts.find(c => Number(c.id) === Number(id));
  },
  
};
const actions = {
  async CreatePost({dispatch},post) {
    // console.log('Inside Create Post',this.getters.StateUsertoken)
    // console.log(post)
    await axios.post("posts/",{body:post},{headers:{ Authorization: `token ${this.getters.StateUsertoken}`}});
    return await dispatch("GetPosts");
  },

  async GetPosts({ commit }) {
    // console.log('Inside Get Posts',this.getters.StateUsertoken)
    const response = await axios.get("posts/");
    commit("setPosts", response.data);
  },

  
  async CreateComment({dispatch},comments) {
    // console.log('Inside Create Comment',this.getters.StateUsertoken)
    // console.log(comments)
    await axios.post("comments/",{body:comments.body , post:comments.post},{headers:{ Authorization: `token ${this.getters.StateUsertoken}`}});
    return await dispatch("GetComments");
  },

  async GetComments({ commit }) {
    // console.log('Inside Get Comments',this.getters.StateUsertoken)
    const response = await axios.get("comments/");
    commit("setcomments", response.data);
  },

  async CreateLike({dispatch},postid) {
    // console.log('Inside Create Like',this.getters.StateUsertoken)
    // console.log(likes)
    await axios.post("likes/",{post:postid},{headers:{ Authorization: `token ${this.getters.StateUsertoken}`}});
    return await dispatch("GetLikes");
  },

  async DeleteLike({dispatch},postid) {
    let like_url = `likes/${postid}/${this.getters.StateUserId}/`
    // console.log('Inside Delete Like',like_url)
    await axios.delete(like_url,{post:postid});
    return await dispatch("GetLikes");
  },

  async GetLikes({ commit }) {
    // console.log('Inside Get Likes',this.getters.StateUsertoken)
    const response = await axios.get("likes/");
    // console.log('Inside Get Likes',response.data)
    commit("setlikes", response.data);
  },

  async GetPostAccount({ commit },userid) {
    const response = await axios.get(`accounts/${userid}/`);
    // console.log('Inside GetPostAccount',response.data)
    commit("setpostaccount", response.data);
  },

};

const mutations = {

  setPosts(state, posts) {
    state.posts = posts.reverse(); //reverse: to updatae posts with the latest created
  },
  setcomments(state, comments) {
    state.comments = comments.reverse();
  },
  setlikes(state, likes) {
    state.likes = likes.reverse();
  },
  setpostaccount(state,postacc){
      state.postaccount = postacc
  }

};

export default {
  state,
  getters,
  actions,
  mutations,
};
