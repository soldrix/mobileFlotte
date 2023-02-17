import { createRouter, createWebHistory } from '@ionic/vue-router';
import Agence from '../views/Agences.vue'
import Register from '../views/Auth/Register.vue'
import Login from '@/views/Auth/Login.vue'
import voiture from '../views/voitures';
import voitureLocation from "../views/voitureLocation";
import forgotPassword from "../views/forgotPassword";
// import voiture from "../views/admin/voiture";
// import entretien from "../views/admin/Entretiens";
// import Reparation from "../views/admin/Reparation";
// import Assurance from "../views/admin/Assurance";
// import Location from "../views/admin/Location";
const routes = [
  {
    path: '/',
    redirect: '/agences'
  },
  {
    path: '/agences',
    name: 'Agence',
    component: Agence
  },
  {
    path: '/agence/voitures',
    name: 'voitures',
    component: voiture
  },
  {
    path: '/voiture/location',
    name: 'location',
    component: voitureLocation
  },
  // {
  //   path: '/voitures',
  //   name: 'Voiture',
  //   component: voiture
  // },
  // {
  //   path: '/entretiens',
  //   name: 'Entretien',
  //   component: entretien
  // },
  // {
  //   path: '/reparations',
  //   name: 'Reparation',
  //   component: Reparation
  // },
  // {
  //   path: '/assurances',
  //   name: 'Assurance',
  //   component: Assurance
  // },
  // {
  //   path: '/locations',
  //   name: 'Location',
  //   component: Location
  // },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: forgotPassword
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') == null && to.name != 'Login' && to.name != 'Register' && to.name != 'forgot-password') {
    next('/login')
  }
  else next()
})

export default router
