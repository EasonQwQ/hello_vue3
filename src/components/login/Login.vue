<template>
  <div class="form-view">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="用户名" v-bind="validateInfos.name">
        <a-input v-model:value="modelRef.username" placeholder="用户名" />
      </a-form-item>
      <a-form-item label="密码" v-bind="validateInfos.password">
        <a-input-password
          v-model:value="modelRef.password"
          placeholder="密码"
          autocomplete="on"
        />
      </a-form-item>
      <a-form-item :wrapper-col="wrapperCol" class="btn-view">
        <a-button type="primary" @click="onSubmit"> 登录 </a-button>
        <a-button style="margin-left: 10px" @click="resetFields">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { customRef, reactive, toRaw } from 'vue';
import { useForm } from '@ant-design-vue/use';
import * as api from '../../api';
function myRef(data) {
  return customRef(async (track, trigger) => {
    const res = await api.login(data);
    console.log('myRef -> res', res);
    return {
      get() {
        track();
        console.log('object', res);
        return data;
      },
      set() {
        trigger();
      },
    };
  });
}
export default {
  setup() {
    const modelRef = reactive({
      username: '',
      password: undefined,
      type: [],
    });
    const rulesRef = reactive({
      username: [
        {
          required: true,
          message: '用户名不能为空',
        },
      ],
      password: [
        {
          required: true,
          message: '密码不能为空',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );
    const onSubmit = (e) => {
      e.preventDefault();
      validate()
        .then(() => {
          const { username, password } = toRaw(modelRef);
          const res = myRef({ username, password });
          console.log('onSubmit -> res', res);
        })
        .catch((err) => {
          console.log('error', err);
        });
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20, offset: 1 },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
    };
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
