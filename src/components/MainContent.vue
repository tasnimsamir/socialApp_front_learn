<template>
    <v-layout row wrap align-center>
      
          <v-flex xs8  offset-md2>
            <div v-for="post in posts" :key="post.title">
              <v-card class="my-3" hover>
                <!-- <v-img
                  height="350px"
                  v-bind:src="article.urlToImage"
                ></v-img> -->
                <v-responsive>
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex class="pa-1">
                        <v-col>
                        <v-row><div class="headline" style="font-weight:bold">{{ post.owner }}</div></v-row>
                        
                        <v-row><div style="font-size:xx-small">{{ post.created }}</div></v-row>
                        </v-col>
                      </v-flex>
                    </v-layout>
                  
                  </v-container>
                </v-responsive>
                  <v-card-text>
                    {{ post.body }}
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text>
                        <v-icon
                        dark
                        left
                        >
                          mdi-thumb-up
                      </v-icon>
                        Like
                      </v-btn>
                    <v-spacer></v-spacer>
                    <v-divider class="mx-4"  vertical></v-divider>
                    <v-btn text>
                      <v-icon
                        dark
                        left
                        >
                          mdi-comment
                      </v-icon>
                      Comment
                    </v-btn>
                  <v-spacer></v-spacer>
         <!-- <v-btn small replace color="info" v-bind:href="post" target="_blank" >Read More</v-btn> -->
                </v-card-actions>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
</template>

<script>

import axios from 'axios' 
export default {
  data() {
  return {
    errors: [] ,
    posts: []
  }
},

  async created () {
  await axios.get('http://127.0.0.1:8000/posts/')
    .then(response => {
      this.posts = response.data
      console.log('data:',this.posts)// This will give you access to the full object
    })
    .catch(e => {
      console.log('Error!',e)
      this.errors.push(e)
    })
  },
}
</script>