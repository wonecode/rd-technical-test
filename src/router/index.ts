import { createRouter, createWebHistory } from 'vue-router';
import AccomodationsView from '../views/AccomodationsView.vue';
import ApplicationsView from '../views/ApplicationsView.vue';
import AccomodationDetailsView from '../views/AccomodationDetailsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'accomodations',
      component: AccomodationsView,
    },
    {
      path: '/accomodations/:id',
      name: 'accomodation-details',
      component: AccomodationDetailsView,
    },
    {
      path: '/admin/applications',
      name: 'admin-applications',
      component: ApplicationsView,
    },
    {
      path: '/admin/accomodations',
      name: 'admin-accomodations',
      component: ApplicationsView,
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'accomodations' },
    },
  ],
});

export default router;
