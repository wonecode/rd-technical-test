import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'accomodations',
      component: () =>
        import(/* webpackChunkName: "accomodations" */ '../views/AccomodationsView.vue'),
    },
    {
      path: '/applications',
      name: 'applications',
      component: () =>
        import(/* webpackChunkName: "applications" */ '../views/ApplicationsView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'accomodations' },
    },
  ],
});

export default router;
