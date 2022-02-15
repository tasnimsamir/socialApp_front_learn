<template>
<v-layout column fill-height>
<v-flex>
  <v-card class="mx-auto" max-width="1000" tile>
    <!-- <v-responsive> -->
      <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
      <v-row style="margin:2.5%;position:absolute; top: 130px">
     
                  <v-list-item >
                   <v-list-item-avatar size="100">
                      <img
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="John"
                      >
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="title" style="margin-top:20px;">{{MyProfile.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{MyProfile.email}} | Software Engineer </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action style="margin-top:20px;">
                      <v-btn
                          @click="friendslist()"
                          color="primary"
                        >
                          My Friends
                        </v-btn></v-list-item-action>
                    </v-list-item>       
    </v-row>
    </v-card>
    <br><br><br><br>


  <v-card class="mx-auto" max-width="1000" tile>
   <div v-for="post in myposts" :key="post.id">
     <v-card class="my-3"  hover color="grey lighten-5">
      <v-responsive >
      <v-list-item>
        <v-list-item-avatar size="30">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="John"
            >
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title  class="title" style="margin-top:20px;">{{post.ownername}}</v-list-item-title>
            <v-list-item-subtitle>{{ post.created }}</v-list-item-subtitle>
          </v-list-item-content>
          
        </v-list-item>
       

        <v-card-text @click="postDetails(post.id)" >
          {{ post.body }}
        </v-card-text>

        <v-banner single-line >
          {{post.likes.length}} <v-icon @click="postDetails(post.id)">mdi-heart</v-icon>  
          {{post.comments.length}} <v-icon @click="postDetails(post.id)">mdi-comment</v-icon> 
        </v-banner>
        
      <v-card-actions>
        <v-btn text @click="likesubmit(post.id)">
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
      </v-responsive>
     </v-card>
   </div>
  </v-card>


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
</v-flex>   
</v-layout>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'myprofile',
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
    this.GetPosts()
    this.GetComments()
    this.GetLikes()

  },

  computed: {
    ...mapGetters({MyProfile: "StateUser",Posts: "StatePosts",User: "StateUserEmail",Token: "StateUsertoken",userdetails:"StateUser",userid:"StateUserId"}), 
    myposts: function () {
      // console.log(this.userid)
      return this.Posts.filter(i => i.owner === this.userid) }

  },

  methods: {
    ...mapActions(["CreatePost", "GetPosts","CreateComment", "GetComments","CreateLike", "GetLikes"]),
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
    
  async likesubmit(id) {
      try {
        await this.CreateLike(id);
      } catch (error) {
        throw "Sorry you can't make a like now!"
      }
    },

  friendslist(){
    this.$router.push({ name: 'myfriends'});
  }
     
      },

  };
</script>