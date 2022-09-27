<template>
  <div>
    <a-menu v-model:selectedKeys="current" mode="horizontal">
      <a-menu-item key="home" href="">
        <template #icon>
          <home-outlined />
        </template>
        <a href="/">Home</a>
      </a-menu-item>

      <a-menu-item key="signup" href="">
        <template #icon>
          <home-outlined />
        </template>
        <a href="/Signup">Signup</a>
      </a-menu-item>

      <a-sub-menu key="sub1">
        <template #icon>
          <user-outlined />
        </template>
        <template #title>Account</template>
        <a-menu-item-group title="Account">
          <a-menu-item key="setting:1">Mon Profil</a-menu-item>
          <a-menu-item key="setting:2">Mes présentations</a-menu-item>
          <a-menu-item key="setting:2" style="color: red"
            >Déconnexion</a-menu-item
          >
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import {
  //SettingOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "Menu",
  components: {
    //SettingOutlined,
    HomeOutlined,
    UserOutlined,
  },
  data() {
    return {
      message: "Actif",
    };
  },
};
</script>
