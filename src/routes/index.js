import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '../components/index.vue';
import Login from '../components/login/Login.vue';
import NotFound from '../components/not_found/NotFound.vue';
import PageHome from '../components/page_home/PageHome.vue';
import Activity from '../components/activity/Activity.vue';
import DetailActivity from '../components/activity/DetailActivity.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Index,
    redirect: '/pageHome',
    children: [
      {
        path: '/pageHome',
        component: PageHome,
      },
      {
        path: '/activity',
        component: Activity,
      },
      {
        path: '/activity/:id',
        component: DetailActivity,
      },
    ],
  },
  {
    path: '/404',
    component: NotFound,
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', name: 'NotFound' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  if (!window.sessionStorage.getItem('token')) {
    return next('/login');
  }
  next();
});

export default router;
