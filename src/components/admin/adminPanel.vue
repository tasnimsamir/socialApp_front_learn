<template>
<v-layout>
<v-card class="justify-left" max_width="300">
  <v-navigation-drawer
        permanent
        expand-on-hover
      >
      <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{userdetails.name}}
              </v-list-item-title>
              <v-list-item-subtitle>{{userdetails.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      <v-list>
      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title >Users</v-list-item-title>
        </template>

        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>User_APIs</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon,link], i) in users"
            :key="i"
            :to= link
          >
            <v-list-item-title  v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</v-card >

<v-card elevation="2" class="mx-auto" width="1000">
      <v-card-title> DashBoard </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="d-flex justify-center">
        <div id="chart3">
          <apexchart
            type="pie"
            width="550"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </v-card-text>
    </v-card>
</v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
  export default {
    data: () => ({
      users: [
        ['Accounts', 'mdi-account-multiple-outline','/admin/accounts'],
        ['Friend Requests', 'mdi-account-multiple-plus',''],
        // ['Posts', 'mdi-post',''],
      ],
      series: [0,0,0,0],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Accounts", "Posts", "Comments", "Likes"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

    }),

  computed: {
    ...mapGetters({accounts: "StateAccounts",Posts: "StatePosts",likes: "StateLikes",Comments:"StateComments",userid:"StateUserId",userdetails:"StateUser"}),
  },

  created: function () {
    this.GetPosts()
    this.GetComments()
    this.GetLikes()
    this.$store.dispatch("GetallAccounts");
    this.$store.dispatch("GetAccount",this.userid);
    console.log(this.accounts.length)
    this.series = [this.accounts.length,this.Posts.length,this.likes.length,this.Comments.length]
  },
  methods: {
    ...mapActions(["GetPosts", "GetComments", "GetLikes"]),
  }

  
  }
</script>