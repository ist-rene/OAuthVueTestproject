import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/grant',
    name: 'Authentication',
    component: () => import('../views/Authentication.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
