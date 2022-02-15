<template>
    <v-layout row wrap align-center>
    <v-flex xs8  offset-md2>
    <div>
        <v-card class="my-3" hover color="grey lighten-5">
          <v-responsive>
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
                          <v-list-item-title class="title" style="margin-top:20px;">{{ blogPost.ownername }}</v-list-item-title>
                          <v-list-item-subtitle>{{ blogPost.created }}</v-list-item-subtitle>
                        </v-list-item-content>
                     </v-list-item>
                  </v-flex>
              </v-layout>
              </v-container>
          </v-responsive>
          <v-card-text>
              {{ blogPost.body }}
          </v-card-text>

          <v-banner single-line>
            {{postLikes.length}} 
            <v-icon @click="likedialog = true">mdi-heart</v-icon>  
            {{postComments.length}} 
            <v-icon>mdi-comment</v-icon> 
          </v-banner>

          
          <v-dialog v-model="likedialog" max-width="250px">
            <v-card>
                <v-card-title>
                <span>Likes</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-list>
              <v-list-item v-for="like in postLikes" :key="like.id"  @click="() => {}">
                  <v-list-item-title>{{ like.owner }}</v-list-item-title>
              </v-list-item>
              </v-list>
              <v-card-actions>
              <v-btn color="primary" text @click="likedialog = false">
                  Close
              </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-card-actions>
               <v-btn
                  type = "submit"
                  text
                  @click="toggleLike"
                  
                >
                  <v-icon v-if="liked===true" dark left> mdi-thumb-down</v-icon>
                  <v-icon v-else dark left> mdi-thumb-up</v-icon>
                  {{ liked ? 'Unlike' : 'Like' }}
            </v-btn>
              <v-spacer></v-spacer>
              <v-divider class="mx-4"  vertical></v-divider>
              <v-btn text @click="submitComment = true">
                <v-icon dark left > mdi-comment </v-icon>
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
                  v-on:click:append ="commentsubmit"  
                  >
                </v-textarea>
            </v-container>
          </div>
          <div v-else></div>

          <v-card-text>
              <div v-for="comment in postComments" :key="comment.id" >
                <v-card class="mx-auto" outlined >
                    <v-container fill-height fluid>
                      <v-layout>
                        <v-flex xs12 align-end d-flex class="pa-1">
                        <v-list-item>
                          <v-list-item-avatar size="30">
                              <img
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt="John"
                              >
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title class="title" style="margin-top:20px;">{{ comment.owner }}</v-list-item-title>
                              <v-list-item-subtitle>{{ comment.created }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    
                  <v-card-text>
                    {{ comment.body }}
                  </v-card-text>
                </v-card>
              </div>
          </v-card-text>
        </v-card>
    </div>
    </v-flex>

  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'postdetails',
  props: {
    id: {
      required: true,
    }
  },
  
  components: {
    
  },
  data() {
    return {
      commentbody: '',
      submitComment: false,
      likedialog: false,
      liked : null,

    };
  },

  created: function () {
    this.GetPosts()
    this.GetComments()
    this.GetLikes()
    this.likedORnot()
    // console.log('Inside Created/ Liked = ',this.liked)
    // console.log("Authenticated user:",this.User)
    // console.log('Token:',this.Token) 
    // console.log(this.$route.params.id )
    // console.log(this.Comments )  
    // console.log('Post Content',this.postById(this.id) ) 
  },

  computed: {
    ...mapGetters({Posts: "StatePosts",Comments: "StateComments",user_id:"StateUserId",
                 likes: "StateLikes", User: "StateUserEmail",Token: "StateUsertoken" ,
                 postById: 'postById',userdetails:"StateUser"}),
    blogPost() {
      return this.postById(this.id);
    },
    postComments: function () {
      return this.Comments.filter(i => i.post === this.blogPost.id)  
  },
    postLikes: function () {
      return this.likes.filter(i => i.post === this.blogPost.id)  
  },
    
  },

   methods: {
    ...mapActions(["CreateComment", "GetComments", "GetPosts","CreateLike", "GetLikes","DeleteLike"]),
    async commentsubmit() {
      try {
        await this.CreateComment({body:this.commentbody , post:this.id});
        this.submitComment = false
      } catch (error) {
        throw "Sorry you can't make a comment now!"
      }
    }, 

    async likesubmit() {
      try {
        await this.CreateLike(this.id);
      } catch (error) {
        throw "Sorry you can't make a like now!"
      }
    }, 

    async unlikesubmit() {
      try {
        await this.DeleteLike(this.id);
      } catch (error) {
        throw "Sorry you can't make unlike now!"
      }
    },

    toggleLike: function(){
      this.liked ? this.unlikesubmit() : this.likesubmit()
      this.liked = !this.liked
      },

    likedORnot: function(){
      if (this.likes.filter(i => i.post === this.blogPost.id && i.owner === this.userdetails.name).length !== 0){//.>>>>>>>>>>>>>>>>>>>>
          this.liked = true
      }
      else{
        this.liked = false
      }
    }
  },
  };
</script>


