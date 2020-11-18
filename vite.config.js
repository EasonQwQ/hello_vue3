// import  { UserConfig } from "vite";

// const config = {
//     optimizeDeps: {
//       include: ["cos-js-sdk-v5"],
//     },
// };

// export default config;
module.exports = {
  optimizeDeps: {
    include: [
      'cos-js-sdk-v5',
      'ant-design-vue/es/date-picker/locale/zh_CN',
      'moment/locale/zh-cn',
      'ant-design-vue/es/locale/zh_CN',
      'ant-design-vue/es/locale/en_US'
    ],
  },
};
