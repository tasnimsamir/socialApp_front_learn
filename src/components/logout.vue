<template>
<v-main>
     <v-container fill-height fluid>
    <span>Logged Out!</span>
     </v-container>
</v-main>
</template>


<script>
import axios from 'axios'
export default {
  data() {
  return {errors:[]}
        },
  async mounted () {
  await axios.get('http://127.0.0.1:8000/logout')
    .then(response => {
      console.log('data:',response.data)
    //   this.$store.dispatch("updateid",'')
    //   this.$store.dispatch("loginmessage",['', ''])
    })
    .catch(e => {
      console.log('Error!',e)
    //   this.errors.push(e)
    })
  },
}
</script>