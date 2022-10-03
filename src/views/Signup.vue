<template>
  <div class="container">
    <!-- SIGN UP -->
    <div class="row">
      <div id="signup" class="col">
        <h1>Sign Up</h1>
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
          <input
            id="user_nom"
            name="user_nom"
            type="text"
            class="form-control"
            placeholder="Nom"
            aria-label="Nom"
            v-model="this.user_nom"
          />

          <input
            id="user_prenom"
            name="user_prenom"
            type="text"
            class="form-control"
            placeholder="Prenom"
            aria-label="Prenom"
            v-model="this.user_prenom"
          />
        </div>

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
            v-model="this.user_password1"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
          <input
            id="user_password2"
            name="user_password2"
            ref="user_password2"
            type="password"
            class="form-control"
            placeholder="Retapez votre Mot de passe"
            aria-label="Retapez votre Mot de passe"
            v-model="this.user_password2"
            @change="verifyPassword()"
          />
        </div>
        <div
          class="alert alert-danger"
          role="alert"
          v-if="validPassword == false"
        >
          Les mots de passe ne correspondents pas
        </div>

        <div class="d-grid gap-2" v-if="submitClick == false">
          <button
            ref="submitButton"
            class="btn btn-outline-dark"
            @click.prevent="submit()"
            disabled
          >
            S'inscrire
          </button>
        </div>

        <div class="d-grid gap-2" v-if="submitClick == true">
          <button class="btn btn-outline-dark" disabled>
            <div class="spinner-border" role="status"></div>
          </button>
        </div>

        <div
          class="alert alert-success"
          role="alert"
          v-if="this.serverResponse.status === 200"
        >
          {{ this.serverResponse.msg }}
        </div>

        <div
          class="alert alert-danger"
          role="alert"
          v-if="
            this.serverResponse.status != 200 &&
            this.serverResponse.status != null
          "
        >
          {{ this.serverResponse.msg }}
        </div>
      </div>

      <div class="col">
        <img alt="Vue logo" width="300" src="../assets/images/signup_img.jpg" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      user_nom: null,
      user_prenom: null,
      user_mail: null,
      user_password1: null,
      user_password2: null,
      validPassword: null,
      submitClick: false,
      serverResponse: { status: null, msg: null },
    };
  },
  methods: {
    verifyPassword() {
      //console.log("verifyPassword");
      if (this.user_password1 == this.user_password2) {
        //console.log("password correcte");
        this.validPassword = true;
        this.$refs.submitButton.disabled = false;
      } else {
        //console.log("password incorrecte");
        this.validPassword = false;
      }
    },
    submit() {
      console.log("Submit form");
      this.submitClick = true;

      const sendData = {
        user_nom: this.user_nom,
        user_prenom: this.user_prenom,
        user_mail: this.user_mail,
        user_password: this.user_password2,
      };

      console.log(this.$store.state.gconfig);

      try {
        axios
          .post(this.$store.state.gconfig.url_signup, sendData, {
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
<style scoped>
form {
  width: 300px;
}

#signup {
  width: 300px;
}
</style>
