<template>
    <v-layout row wrap align-center>
          <v-flex xs8  offset-md2>
              <v-card >
                <v-textarea 
                    v-model="postbody"
                    background-color="white"
                    color="blue lighten-2"
                    prepend-inner-icon="mdi-post"
                    placeholder="What's in your mind?"
                    ></v-textarea>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" class="ma-2" color="primary" dark @click="submit" >
                    Post 
                    <v-icon dark left> mdi-checkbox-marked-circle</v-icon>
                </v-btn>
                </v-card-actions>
              </v-card> 
          </v-flex>

          <v-flex xs8  offset-md2>
            <div v-for="post in friendsposts"  :key="post.id">
              <v-card class="my-3"  hover color="grey lighten-5">
                <v-responsive >
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex class="pa-1">
                        <v-list-item>
                          <v-list-item-avatar size="100">
                              <img
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt="John"
                              >
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title  class="title" @click="profiledetails(post.owner)" style="margin-top:20px;">{{post.ownername}}</v-list-item-title>
                              <v-list-item-subtitle>{{ post.created }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-responsive>
                <v-card-text @click="postDetails(post.id)" >
                  {{ post.body }}
                </v-card-text>

                <v-banner single-line >
                  {{post.likes.length}} <v-icon @click="postDetails(post.id)">mdi-heart</v-icon>  
                  {{post.comments.length}} <v-icon @click="postDetails(post.id)">mdi-comment</v-icon> 
                </v-banner>


                <v-card-actions>
                  <!-- GOOD IDEA FOR TOGGLING -->
                <v-btn
                
                  v-if="(likes.filter(x => x.post===post.id && x.owner===userdetails.name).map(({post})=>post).includes(post.id))" 
                  type = "submit"
                  text
                  @click="unlikesubmit(post.id)"
                >
                <v-icon dark left> mdi-thumb-down</v-icon>
                 Unlike
                </v-btn>
                <v-btn
                  v-else
                  type = "submit"
                  text
                  @click="likesubmit(post.id)"
                >
                <v-icon dark left> mdi-thumb-up</v-icon>
                 Like
                </v-btn>
                  <v-spacer></v-spacer>
                  <v-divider class="mx-4"  vertical></v-divider>
                  <v-btn text @click="submitComment = true" >
                    <v-icon dark left> mdi-comment</v-icon>
                    Comment
                  </v-btn>
                  <v-spacer></v-spacer>
              </v-card-actions>

                <div v-if="submitComment" >
                  <v-container>
                      <v-textarea 
                        v-model="commentbody"
                        background-color="white"
                        color="blue lighten-2"
                        prepend-inner-icon="mdi-comment"
                        placeholder="Write Comment"
                        append-icon="mdi-send"
                        @click:append ="commentsubmit(post.id)"  
                        >
                      </v-textarea>
                  </v-container>
                </div>
                <div v-else></div>  

              </v-card>
            </div>
          </v-flex>
  </v-layout>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'posts',
  components: {
    
  },
  data() {
    return {
      postbody: '',
      submitComment: false,
      commentbody:'',

    };
  },

  created: function () {
    // a function to call getposts action
    console.log("Authenticated user:",this.User)
    console.log('Token:',this.Token)
    this.GetPosts()
    this.GetComments()
    this.GetLikes()
    this.getFrndsAccounts(Object.values(this.userdetails.friends))
    this.$store.dispatch("GetAccount",this.userid);
    this.$store.dispatch("GetfriendRequests");
    //  console.log('===========',(this.likes.map(({owner})=>owner)))
  },

  computed: {
    ...mapGetters({Posts: "StatePosts",userid:"StateUserId",likes: "StateLikes",User: "StateUserEmail",Token: "StateUsertoken",userdetails:"StateUser"}), 
    friendsposts: function () {
      return this.Posts.filter(i => Object.values(this.userdetails.friends).includes(i.owner)) } //filter the posts of my friends only
,
  },

  methods: {
    ...mapActions(["CreatePost", ,"GetFriendsAccounts","GetAccount","GetProfile","GetPosts","CreateComment", "GetComments","CreateLike","DeleteLike", "GetLikes"]),
    async submit() {
      try {
        await this.CreatePost(this.postbody);
      } catch (error) {
        throw "Sorry you can't make a post now!"
      }
    },  
    async commentsubmit(id) {
      try {
        await this.CreateComment({body:this.commentbody , post:id});
        this.submitComment = false
      } catch (error) {
        throw "Sorry you can't make a comment now!"
      }
    }, 

    postDetails(postId){
      // console.log('Entered!',postId)/
      this.$router.push({ name: 'postdetails', params: { id: postId } });
    },
    profiledetails(profileid){
      // console.log('Entered!',profileid)/
      this.$router.push({ name: 'profile', params: { id: profileid } });
      this.$store.commit("setProfileid" ,profileid)
      this.$store.dispatch("GetProfile",profileid);
    },
    
    
  async likesubmit(id) {
    try {
      await this.CreateLike(id);
    } catch (error) {
      throw "Sorry you can't make a like now!"
    }
  }, 

  async unlikesubmit(id) {
    try {
      await this.DeleteLike(id);
    } catch (error) {
      throw "Sorry you can't make unlike now!"
    }
  },
  
  async getFrndsAccounts(userFrnds) {
      try {
        await this.GetFriendsAccounts(userFrnds);
      } catch (error) {
        throw "Sorry you can't get the accounts of your friends now!"
      }
    }, 

  },
  };

</script>