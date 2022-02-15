<template>
<v-main>
    <v-responsive>
    <v-container fill-height fluid>
    <v-layout align-center justify-center>
        <v-window align-center justify-center  style="font-weight:bold"> 
            {{logmsg}}
        </v-window>
    </v-layout>
    </v-container>
    </v-responsive>
</v-main>
</template>

<script>
export default { 
  name: "wait",
  data() {
    return {
        logmsg:''
        }
    },
  created() {
      if (this.$store.state.isAccepted === 1){this.$router.push({name: 'posts'})}
      else{
          this.$store.dispatch('refreshMessage', this.$store.state.acc_id);
          this.logmsg = this.$store.state.login_message
      }

  }

};
</script>

