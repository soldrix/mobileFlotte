import { createRouter, createWebHistory } from '@ionic/vue-router';
import CoursesList from '../views/CoursesList.vue'
import Register from '../views/Auth/Register.vue'
import Login from '@/views/Auth/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/courses',
    name: 'Courses',
    component: CoursesList
  },
  {
    path: '/produits/:courseId',
    name: 'Products',
    component: () => import('@/views/ProductsList')
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
