<template>
  <v-content style="background-color: lightblue">
    <v-card class="pa-2">
      <v-form v-model="valid" class="ma-8" width="100px">
        <v-row>
          <v-text-field
            v-model="username"
            label="Username"
            :rules="nameRules"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            label="Password"
            :rules="nameRules"
            type="password"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn color="green" :disabled="!valid" @click.prevent="login()">
            Login
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-content>
</template>

<script>
import userClass from '@/model/user_class.js'
// import userApi from '@/api/user_api.js'

export default {
  name: "Login",
  data() {
    return {
      valid: false,
      username: "",
      password: "",
      nameRules: [
        v => !!v || "Required",
      ],
      error: '',
      userObj: new userClass()
    };
  },
  methods: {
    async login() {
      if(this.username && this.password) {
        try {
        this.setUserObj();
        const req = await this.userObj.login();
        console.log(req)
        if(req.err || req.message) {
          alert(req.err);
        } else {
          this.$router.push("/vuetify_test")
        }
      } catch (err) {
        alert(err);
      }
      } else {
        alert('please enter username and password')
      }
    },
    setUserObj() {
      this.userObj.username = this.username;
      this.userObj.password = this.password;
    }
  }
};
</script>
