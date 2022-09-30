<template>
  <div class="container">
    <!-- SIGN UP -->

    <div class="row">
      <div class="col">
        <img alt="Vue logo" width="300" src="../assets/images/signup_img.jpg" />
      </div>
      <div id="signup" class="col">
        <h1>Sign In</h1>

        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fa-solid fa-at"></i></span>
          <input
            id="user_mail"
            name="user_mail"
            type="mail"
            class="form-control"
            placeholder="E-Mail"
            aria-label="E-Mail"
            v-model="this.user_mail"
          />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
          <input
            id="user_password1"
            name="user_password1"
            ref="user_password1"
            type="password"
            class="form-control"
            placeholder="Mot de passe"
            aria-label="Mot de passe"
            v-model="this.user_password"
          />
        </div>

        <div class="d-grid gap-2" v-if="submitClick == false">
          <button
            ref="submitButton"
            class="btn btn-outline-dark"
            @click="submit()"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Signin",
  data() {
    return {
      user_mail: null,
      user_password: null,
      submitClick: false,
    };
  },
  methods: {
    submit() {
      console.log("submit");
      const sendData = {
        user_mail: this.user_mail,
        user_password: this.user_password,
      };

      try {
        axios
          .post("http://localhost:3001/signin", sendData, {
            headers: {
              //"Content-Type": "multipart/form-data",
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            this.serverResponse = res.data;
            this.submitClick = false;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped></style>
