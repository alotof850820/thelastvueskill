import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import NotFound from './pages/NotFound.vue';
import { useAuthStore } from './store/modules/auth';

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
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuth) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && authStore.isAuth) {
    next('/coaches');
  } else {
    next();
  }
});

export default route;
