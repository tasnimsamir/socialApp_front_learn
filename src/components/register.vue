<template >
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
        <v-card class="elevation-12" id = "registerform">
            <v-toolbar dark color="primary">
            <v-row
                align="center"
                justify="space-around"
            >
            <v-col>
                <v-toolbar-title>Registration Form</v-toolbar-title>
            </v-col>
            </v-row>
            </v-toolbar>
            
            <v-card-text>
            <form ref="form" id="formbox" method="Post" v-on:submit.prevent="submit" >
                <v-text-field
                v-model="form.name"
                name="username"
                label="Username"
                type="text"
                required
                ></v-text-field>
                <v-text-field
                v-model="form.email"
                name="email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
                ></v-text-field>
                <v-text-field
                v-model="form.zipcode"
                name="zipcode"
                label='Zip Code'
                type="text"
                required
                ></v-text-field>

                <v-text-field
                v-model="form.Date_of_Birth"
                name="birthdate"
                label="BirthDate"
                type="text" onfocus="(this.type='date')" onblur="(this.type='text')"
                required
                ></v-text-field>

                <v-row>
                <v-col>
                <v-select
                v-model="form.gender"
                :items="form.gender"
                menu-props="auto"
                label= "Gender"
                hide-details
                single-line
                ></v-select>
                </v-col>
                </v-row>

                <v-text-field
                v-model="form.password"
                name="password"
                label="password"
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
                    >Register
                    </v-btn>
                </v-col>
                </v-row>
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
  name: "register",
  components: {},
  data() {
    return {
      form: {
        name:"",
        email: "",
        zipcode:"",
        Date_of_Birth:"",
        password: "",
        gender: ['M' , 'F'],
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 5) || "Password must have 5+ characters",
        (v) => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
        (v) => /(?=.*\d)/.test(v) || "Must have one number",
        (v) => /([!@$%])/.test(v) || "Must have one special character [!@#$%]",
      ],
      showError: false
    };
},
methods: {
  ...mapActions(["Register"]),
  async submit() {
    try {
      await this.Register(this.form);
      this.$router.push("/posts");
      this.showError = false
    } catch (error) {
      this.showError = true
    }
  },
},
};
</script>