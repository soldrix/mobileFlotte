import { createRouter, createWebHistory } from '@ionic/vue-router';
import Agence from '../views/Agences.vue'
import Register from '../views/Auth/Register.vue'
import Login from '@/views/Auth/Login.vue'
import voiture from "../views/voiture";
import entretien from "../views/Entretiens";
import Reparation from "../views/Reparation";
import Assurance from "../views/Assurance";
import Location from "../views/Location";
const routes = [
  {
    path: '/',
    redirect: '/voitures'
  },
  {
    path: '/agences',
    name: 'Agence',
    component: Agence
  },
  {
    path: '/voitures',
    name: 'Voiture',
    component: voiture
  },
  {
    path: '/entretiens',
    name: 'Entretien',
    component: entretien
  },
  {
    path: '/reparations',
    name: 'Reparation',
    component: Reparation
  },
  {
    path: '/assurances',
    name: 'Assurance',
    component: Assurance
  },
  {
    path: '/locations',
    name: 'Location',
    component: Location
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
  if (localStorage.getItem('token') == null && to.name != 'Login' && to.name != 'Register') {
    next('/login')
  }
  else next()
})

export default router
