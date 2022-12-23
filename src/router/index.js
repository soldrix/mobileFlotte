import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue';
import Tab1Page from "../views/Tab1Page";
import Tab2Page from "../views/Tab2Page";
import Tab3Page from "../views/Tab3Page";

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => Tab1Page
      },
      {
        path: 'tab2',
        component: () => Tab2Page
      },
      {
        path: 'tab3',
        component: () => Tab3Page
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
