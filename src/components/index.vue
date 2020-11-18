<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-model:collapsed="menuCollapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="header-view">
        <menu-unfold-outlined
          v-if="menuCollapsed"
          class="trigger"
          @click="toggleCollapsed"
        />
        <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
        <a-button type="danger" @click="loginOut" class="loginout"
          >退出</a-button
        >
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="textalign: center">
        技术支持请联系邮箱 bbtjym@qq.com
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import Menu from './menu/Menu.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api/index';
import { toRaw } from 'vue';
export default {
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token),
      userInfo: computed(() => store.state.userInfo),
      menuCollapsed: computed(() => store.state.menuCollapsed),
    };
  },
  components: {
    Menu,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },

  data() {
    return {
      selectedKeys: ['1'],
      collapsed: false,
      // token: this.$store.token,
    };
  },
  beforeMount() {
    this.getUser();
  },
  methods: {
    toggleCollapsed() {
      this.$store.commit('toggleCollapsed');
    },

    loginOut() {
      console.log('loginOut');
      window.sessionStorage.clear();
      this.$router.replace({ path: '/' });
    },

    async getUser() {
      const userInfo = await api.getUser();
      this.$store.commit('saveUserInfo', userInfo);
    },
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.loginout {
  margin-left: auto;
  margin-right: 10px;
}
.header-view {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.text {
  border: 1px dashed #333;
}
</style>
