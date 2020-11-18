<template>
  <a-empty
    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
    :image-style="{
      height: '60px',
    }"
  >
    <template v-slot:description>
      <span>页面突然被怪兽抓走了 </span>
    </template>
    <a-button type="danger" @click="loignIn">登录</a-button>
  </a-empty>
</template>
<script>
export default {
  methods: {
    loignIn() {
      this.$router.replace({ path: '/login' });
    },
  },
};
</script>
