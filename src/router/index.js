import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Recorder from "@/views/Recorder.vue";
import Signup from "@/views/Signup.vue";
import Signin from "@/views/Signin.vue";
import Account from "@/views/Account.vue";
import ErrorPage from "@/views/ErrorPage.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    name: "Recorder",
    path: "/Recorder",
    component: Recorder,
    meta: {
      title: "Recorder",
    },
  },
  {
    name: "Account",
    path: "/Account",
    component: Account,
    meta: {
      title: "Account",
    },
  },
  {
    name: "Signup",
    path: "/Signup",
    component: Signup,
    meta: {
      title: "Signup",
    },
  },
  {
    name: "Signin",
    path: "/Signin",
    component: Signin,
    meta: {
      title: "Signin",
    },
  },
  {
    name: "ErrorPage",
    path: "/ErrorPage",
    component: ErrorPage,
    meta: {
      title: "Error Page",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  //router.afterEach((to, from) => {
  //console.log(to, from)
  document.title = to.meta.title;
});

export default router;
