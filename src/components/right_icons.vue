<template>
<v-layout>
        <!-- SUGGESTED FRIENDS ICON -->
    <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon  style="color: white;">mdi-account-multiple</v-icon>
            </v-btn>
        </template>
        <v-list three-line>
            <v-subheader class="title">Suggested Friends</v-subheader>
            <div  v-for="user in Suggested" :key="user.id">
                <v-divider></v-divider>
                <v-list-item >
                <v-list-item-avatar>
                    <v-img src="https://www.w3schools.com/howto/img_avatar.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-content >
                    <v-list-item-title >{{user.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <!-- GOOD IDEA FOR TOGGLING -->
                <v-btn
                  v-if="(FriendRequests.filter(x => x.from_user===userid && x.to_user===user.id).map(({to_user})=>to_user).includes(user.id))" 
                  color="primary"
                  type = "submit"
                  text
                  @click="RemoveFrndRequest(user.id)"
                  
                >
                 Remove Friend 
                </v-btn>
                <v-btn
                  v-else
                  color="primary"
                  type = "submit"
                  text
                  @click="mkFrndRequest(user.id)"
                  
                >
                 Add Friend 
                </v-btn>
                </v-list-item>
            </div>

        </v-list>
      </v-menu>

      <!-- FRIEND REQUESTS ICON -->
    <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon style="color: white;">mdi-account-multiple-plus</v-icon>
            </v-btn>
        </template>
        <v-list three-line>
            <v-subheader class="title">Friend Requests</v-subheader>
            <div  v-for="user in MyFriendRequests" :key="user.id">
                <v-divider></v-divider>
                <v-list-item >
                <v-list-item-avatar>
                    <v-img src="https://www.w3schools.com/howto/img_avatar.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-content >
                    <v-list-item-title >{{user.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  type = "submit"
                  text
                  @click="acceptFrndRequest(user.id)"
                  
                >
                 Accept
                </v-btn>
                <v-btn
                  color="primary"
                  type = "submit"
                  text
                  @click="RemoveFrndRequest(user.id)"
                >
                 Ignore
                </v-btn>
                </v-list-item>
            </div>

        </v-list>
      </v-menu>

      <v-btn icon >
        <v-icon style="color: white;">mdi-dots-vertical</v-icon>
      </v-btn>

</v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
  export default {
    name: 'Friends',
    data: () => ({
    }),
  created: function () {
    this.getFrndsAccounts(Object.values(this.userdetails.friends));
    this.$store.dispatch("GetAccount",this.userid);
    this.getsuggAccounts(Object.values(this.userdetails.friends));
    this.$store.dispatch("GetfriendRequests");
    this.$store.dispatch("GetMyFriendRequestsAccounts");
    // console.log('============',MyFriendRequests)
    // console.log('============',this.FriendRequests.map(({to_user})=>to_user))
    // console.log('=====',this.FriendRequests.find(x => x.to_user===this.userid))
    // console.log('=====',this.FriendRequests.filter(x => x.from_user===5 && x.to_user===4).map(({to_user})=>to_user).includes(4))

    
  },

      computed: {
    ...mapGetters({userdetails:"StateUser",Suggested:"StateSuggested",userid:"StateUserId",FriendRequests: "StateFriendRequests",MyFriendRequests:"StateMyFriendRequests"}),

  },
  methods:{
    ...mapActions(["GetsuggestedAccounts","GetFriendsAccounts","makeFriendRequest","DeleteFriendRequest","AcceptFriendRequest","GetfriendRequests"]),
    async getsuggAccounts(userFrnds) {
      try {
        await this.GetsuggestedAccounts(userFrnds);
      } catch (error) {
        throw "Sorry you can't get the accounts of Suggested now!"
      }
    },  
    async getFrndsAccounts(userFrnds) {
      try {
        await this.GetFriendsAccounts(userFrnds);
      } catch (error) {
        throw "Sorry you can't get the accounts of your friends now!"
      }
    }, 
    async mkFrndRequest(to_user_id) {
      try {
        await this.makeFriendRequest(to_user_id);
      } catch (error) {
        throw "Sorry you can't make the friend request now!"
      }
    }, 
     async RemoveFrndRequest(to_user_id) {
      try {
        await this.DeleteFriendRequest(to_user_id);
      } catch (error) {
        throw "Sorry you can't remove the friend request now!"
      }
    }, 
    async acceptFrndRequest(to_user_id) {
      try {
        await this.AcceptFriendRequest(to_user_id);
      } catch (error) {
        throw "Sorry you can't accept the friend request now!"
      }
    }, 
  }
  }
</script>