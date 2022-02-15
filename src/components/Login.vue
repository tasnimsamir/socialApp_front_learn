<template>
<v-main>
<v-container fluid fill-height>
<v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
 <v-card class="elevation-12" id=loginform>
    <v-toolbar dark color="primary">
      <v-row
        align="center"
        justify="space-around"
      >
      <v-col>
          <v-toolbar-title>Login</v-toolbar-title>
      </v-col>
    </v-row>
    </v-toolbar>
      
    <v-card-text>
      <form ref="form"  method="Post" v-on:submit.prevent="submit" >
             <v-text-field
                v-model="form.email"
                name="email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.password"
                name="password"
                label= "Password"
                type="password"
                :rules="passwordRules"
                error-count="5"
                required
            ></v-text-field>
            
            <v-row>
                <v-col>
                    <v-btn
                        type="submit"
                        class="mt-4"
                        color="primary"
                        value="log in"
                        > Login
                    </v-btn>
                </v-col>
                <!-- <v-col cols=4>
                    <v-btn
                        type="submit"
                        class="mt-4"
                        color="primary"
                        value="log in"
                        > Cancel
                    </v-btn>
                </v-col> -->
            </v-row>
            <p v-if="showError" id="error">Username or Password is incorrect</p>
            
</form>
</v-card-text>
</v-card>
</v-flex>
</v-layout>
</v-container>
</v-main>
</template>


<script>
import { mapActions } from "vuex";
export default { 
  name: "login",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
      ],
      showError: false
    };
  },

  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("email", this.form.email);
      User.append("password", this.form.password);
      try {
          await this.LogIn(User);
          console.log('inside login vue');
          this.$router.push("/posts");
          this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
  };
</script>
