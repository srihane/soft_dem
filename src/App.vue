<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">-->
  <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <Menu />
  <router-view></router-view>
</template>

<script>
import axios from "axios";
//CSS
require("./css/style.css");

// Importing Components
//import HelloWorld from './components/HelloWorld.vue'

// Components
import Menu from "./components/Menu.vue";

// Views
//import Home from "./views/Home.vue";

export default {
  name: "App",
  components: {
    //Home,
    //HelloWorld
    Menu,
  },
  methods: {
    verifyTimeoutSessionStorage() {
      if (sessionStorage.getItem("userData")) {
        const data = JSON.parse(sessionStorage.getItem("userData"));
        console.log(data);

        const dateData = new Date(data.timeout);
        let dateTimeout = dateData.getDate();

        console.log(dateTimeout);

        const nowDate = new Date();
        console.log(nowDate.getDate());

        if (nowDate.getDate() === dateTimeout) {
          console.log("Session à jour");
          this.$store.state.userData = data.user_data;

          //On requete le serveur avec les nouvelles données

          const sendData = {
            user_mail: data.user_data.user_mail,
            user_password: data.user_data.user_password,
          };

          try {
            axios
              .post(this.$store.state.gconfig.url_signin, sendData, {
                headers: {
                  //"Content-Type": "multipart/form-data",
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                this.serverResponse = res.data;
                this.submitClick = false;

                if (res.data.status === 200) {
                  this.$store.state.userData = res.data.user_data;
                  // ROUTER REDIRECTION
                  //this.$router.push("/");
                }
              });
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log("délai session dépassé");
          sessionStorage.removeItem("userData");
          this.$store.state.userData = null; // Remise à Zero de la data du store
        }
      } else {
        console.log("Aucune session présente");
        this.$store.state.userData = null; // Remise à Zero de la data du store
      }
    },
  },
  created() {
    //console.log(sessionStorage.getItem("userData"));
    this.verifyTimeoutSessionStorage();
  },
};
</script>

<style>
/*@import "~bulma/css/bulma.css";*/
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
</style>
