<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="用户名" v-bind="validateInfos.name">
      <a-input v-model:value="modelRef.name" />
    </a-form-item>
    <a-form-item label="密码" v-bind="validateInfos.password">
      <a-input-password
        v-model:value="modelRef.password"
        placeholder="input password"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> Create </a-button>
      <a-button style="margin-left: 10px" @click="resetFields">
        Reset
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { reactive, toRaw } from 'vue';
import { useForm } from '@ant-design-vue/use';
export default {
  setup() {
    const modelRef = reactive({
      name: '',
      password: undefined,
      type: [],
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: 'Please input name',
        },
      ],
      password: [
        {
          required: true,
          message: 'Please input password',
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
          console.log(toRaw(modelRef));
        })
        .catch((err) => {
          console.log('error', err);
        });
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
    };
  },
};
</script>
