<template>
<v-app light>
  <!-- =================================NavBar===================================================== -->
  <v-app-bar fixed app light clipped-left color="primary" class="elevation-2">
    <!-- <SideMenu/> -->
    <v-app-bar-nav-icon @click="drawer = !drawer"  class="white--text"></v-app-bar-nav-icon>
    <v-row>
      <v-col cols=4>
        <v-toolbar-title class="white--text">Social APP</v-toolbar-title>
      </v-col>
      <v-col>
          <router-link class="mx-2" style="color:white;font-weight:bold" to="/">Home</router-link>|
          <span v-if="isLoggedIn && !isStaff">
            <router-link class="mx-2" style="color:white;font-weight:bold" to="/posts">Posts</router-link>|
            <router-link class="mx-2" style="color:white;font-weight:bold" to="/myprofile/">My Profile</router-link>
            <!-- <a class="mx-2" style="color:white;font-weight:bold"  @click="logout">Logout</a> -->
          </span>
          <span v-else-if="isLoggedIn && isStaff">
            <router-link class="mx-2" style="color:white;font-weight:bold" to="/posts">Posts</router-link>|
            <router-link class="mx-2" style="color:white;font-weight:bold" to="/admin/">My Profile</router-link>
            <!-- <a class="mx-2" style="color:white;font-weight:bold"  @click="logout">Logout</a> -->
          </span>
          <span v-else>
            <router-link class="mx-2" style="color:white;font-weight:bold" to="/register">Register</router-link>|
            <router-link class="mx-2" style="color:white;font-weight:bold" to="/login">Login</router-link>
          </span>
      </v-col>
      <v-spacer></v-spacer>
    <righticons v-if="isLoggedIn"></righticons>
    </v-row>
    

      
      

  </v-app-bar>

    <!-- =================================Main Content===================================================== -->

  <v-main>
    <v-container fluid>
      <router-view/>
    </v-container>
   </v-main>

    <!-- =================================Footer===================================================== -->

   <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            and <a class="white--text" href="https://github.com/rachidsakara" 
                target="_blank">Rachid Sakara</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>



<script>
import righticons from '@/components/right_icons' 
export default {

  components: {
    righticons,
  },

  data() {
    return {
      // drawer:false,
    }
  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isAuthenticated},
      isStaff : function(){ return this.$store.getters.isAuthorized}
    },

  methods: {
      async logout (){
        await this.$store.dispatch('LogOut')
        this.$router.push('/login')
      }
    },

  }
</script>