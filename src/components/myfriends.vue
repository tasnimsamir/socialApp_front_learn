<template>
  <v-card
    max-width="1000"
    class="mx-auto"
  >
    <v-list three-line>
      <v-subheader class="title">Friends</v-subheader>
      <div  v-for="friend in myFriends"  :key="friend.id">
        <v-divider></v-divider>
        <v-list-item >
          <v-list-item-avatar>
            <v-img src="https://www.w3schools.com/howto/img_avatar.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >{{friend.name}}</v-list-item-title>
            <v-list-item-subtitle>{{friend.email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>

    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
  export default {
    name: 'Friends',
    data: () => ({

    }),
  created: function () {
    this.getFrndsAccounts(Object.values(this.userdetails.friends))
    this.$store.dispatch("GetAccount",this.userid);
  },

      computed: {
    ...mapGetters({userdetails:"StateUser",myFriends:"StateFriends",userid:"StateUserId"}),
  },
  methods:{
    ...mapActions(["GetFriendsAccounts"]),
    async getFrndsAccounts(userFrnds) {
      try {
        await this.GetFriendsAccounts(userFrnds);
      } catch (error) {
        throw "Sorry you can't get the accounts of your friends now!"
      }
    },  
  }
  }
</script>

