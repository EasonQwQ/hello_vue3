<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    logo="12313"
    :inline-collapsed="collapsed"
    :overflowedIndicator="'<span>123123</span>'"
  >
    <a-menu-item @click="openCollapsed(item.path)" v-for="item in munuList" >
      <PieChartOutlined />
      <span>{{ item.parentMenu }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import store from './../../store/store';
export default {
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  data() {
    return {
      // collapsed: false,
      munuList: [
        {
          parentMenu: '查看活动',
          path: '/activity',
          title:'123123123'
        },
        {
          parentMenu: '查看1活动',
          path: '/pageHome',
          title:'123123123'
        },
      ],
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
      collapsed: store.state.menuCollapsed,
    };
  },
  watch: {
    openKeys(val, oldVal) {
      this.preOpenKeys = oldVal;
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.openKeys = this.collapsed ? [] : this.preOpenKeys;
    },
    openCollapsed(path) {
      console.log('openCollapsed -> path', path);
      this.$router.push({ path });
      this.$store.commit('openCollapsed');
    },
  },
};
</script>
