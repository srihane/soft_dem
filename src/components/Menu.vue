<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        Demasoft
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <!--<span class="navbar-toggler-icon"></span>-->
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <!--<a class="nav-link active" aria-current="page" href="/">Home</a>-->
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/Recorder"
                >Créer Vidéo</a
              >
            </li>
          </ul>
          <div
            class="d-flex justify-content-end"
            v-if="this.$store.state.userData === null"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <!--<a class="nav-link" href="/Signup">Signup</a>-->
                <router-link class="nav-link" to="/Signup">Signup</router-link>
              </li>
              <li class="nav-item">
                <!--<a class="btn btn-primary" href="/Signin">Signin</a>-->
                <router-link class="btn btn-primary" to="/Signin"
                  >Signin</router-link
                >
              </li>
            </ul>
          </div>

          <div
            class="d-flex justify-content-end"
            v-if="this.$store.state.userData != null"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="btn btn-success" href="/Account">Mon compte</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Menu",
  components: {},
  data() {
    return {
      message: "Actif",
    };
  },
};
</script>
