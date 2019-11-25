import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/city'
  },
  {
    path: '/city',
    name: 'City',
    component: () => import('@/views/City'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/address/:cityid',
    name: 'Address',
    component: () => import('@/views/Address')
  },
  {
    path: '/msite',
    name: 'Msite',
    component: () => import('@/views/Msite'),
    meta: {
      keepAlive: true
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
