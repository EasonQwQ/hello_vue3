import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import './index.css';
import store from './store/store';
import router from './routes/index';

createApp(App).use(store).use(router).use(Antd).mount('#app');
