<template>
  <div class="form-view">
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      ref="ruleForm"
      :model="form"
      :labelAlign="'left'"
    >
      <a-form-item label="用户名" name="username">
        <a-input
          ref="username"
          v-model:value="form.username"
          placeholder="用户名"
        />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password
          v-model:value="form.password"
          placeholder="密码"
          autocomplete="on"
        />
      </a-form-item>
      <a-form-item :wrapper-col="wrapperCol" class="btn-view">
        <a-button type="primary" @click="onSubmit"> 登录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { customRef, reactive, toRaw, createApp } from 'vue';
import { useForm } from '@ant-design-vue/use';
import * as api from '../../api';
export default {
  data() {
    return {
      form: {
        username: '1',
        password: '1',
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
      rules: {
        username: [
          {
            required: true,
            message: 'Please input username',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 10,
            message: 'Length should be 1 to 10',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    async getActivities() {
      const activitiesData = await api.getActivities();
      this.activitiesData = activitiesData.rows;
      console.log('getActivities -> res', activitiesData.rows);
    },
    async onSubmit() {
      const that = this;
      this.$refs.ruleForm
        .validate()
        .then(async () => {
          const { username, password } = toRaw(this.form);
          const { code, data: token } = await api.login({ username, password });
          if (code === 1) {
            that.$message.info('登录成功');
            window.sessionStorage.setItem('token', `Beare1 ${token}`);
            this.$router.push('/home');
            this.$store.commit('saveToken', token);
          } else {
            that.$message.error('账号密码错误');
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.form-view {
  margin: auto;
  margin-top: 200px;
  width: 600px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-view {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
