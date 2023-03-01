import { createRouter, createWebHistory } from '@ionic/vue-router';
import Agence from '../views/Agences.vue'
import Register from '../views/Auth/Register.vue'
import Login from '../views/Auth/Login.vue'
import voiture from '../views/voitures';
import voitureLocation from "../views/voitureLocation";
import forgotPassword from "../views/forgotPassword";
import profil from "../views/profil";
import resetPassword from "../views/resetPassword";
import locations from "../views/locations";
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
    name: 'voiture-location',
    component: voitureLocation
  },
  {
    path: '/profil',
    name: 'Profil',
    component: profil
  },
  {
    path: '/locations',
    name: 'Location',
    component: locations
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: forgotPassword
  },
  {
    path:'/reset-password',
    name:'reset-password',
    component: resetPassword
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
  if (localStorage.getItem('token') == null && to.name != 'Login' && to.name != 'Register' && to.name != 'forgot-password' && to.name != 'reset-password') {
    next('/login')
  }
  else next()
})

export default router
