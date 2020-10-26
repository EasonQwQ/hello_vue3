import { createRouter, createWebHashHistory } from 'vue-router';
import index from '../components/index.vue';
import Login from '../components/login/Login.vue';
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
