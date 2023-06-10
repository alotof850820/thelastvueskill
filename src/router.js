import { createRouter, createWebHistory } from 'vue-router';
// import CoachDetails from './pages/coaches/CoachDetails';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsRecive from './pages/requests/RequestsRecive.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from '../src/pages/auth/UserAuth.vue';
import store from './store';

const CoachDetails = () => import('./pages/coaches/CoachDetails');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestsRecive = () => import('./pages/requests/RequestsRecive.vue');
const UserAuth = () => import('../src/pages/auth/UserAuth.vue');

const route = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetails,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
        },
      ],
    },
    {
      // 使用 meta 属性可以为路由添加任意的自定义元数据
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnAuth: true,
      },
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/requests',
      component: RequestsRecive,
      meta: {
        requiresAuth: true,
      },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

//安全機制
route.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuth) {
    next('/coaches');
  } else {
    next();
  }
});

export default route;
