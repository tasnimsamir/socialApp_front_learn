<template>
<v-main>
    <v-responsive>
    <v-container fill-height fluid>
    <v-layout align-center justify-center>
        <v-window align-center justify-center  style="font-weight:bold"> 
            {{userapprovaldetails.is_accepted_message}}
        </v-window>
    </v-layout>
    </v-container>
    </v-responsive>
</v-main>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
export default { 
  name: "wait",
  data() {
    return {
        }
    },

  computed:{
    ...mapGetters({userid:"StateUserId",userapprovaldetails:"StateUserApproval"}), 
  },
  async created() {
    await this.getAcc()
    this.userapprovaldetails.is_accepted===1? await this.$router.push("/posts") :await this.$router.push("/wait");

  }
  ,
  methods:{
      ...mapActions(["GetAccount"]),
    async getAcc() {
      try {
        await this.GetAccount(this.userid);
      } catch (error) {
        throw "Waiiit!"
      }
    },
  }

};
</script>

