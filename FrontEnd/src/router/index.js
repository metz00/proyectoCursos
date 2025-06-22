import { createRouter, createWebHistory } from 'vue-router'
import { fetchUserMe } from '@/modules/Auth/services/user.service'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: async (to, from, next) => {
      const token = localStorage.getItem('token')
      if (!token) return next('/auth/sign-in')

      try {
        await fetchUserMe()
        next()
      } catch (err) {
        console.error('Error al obtener usuario o token inválido:', err)
        localStorage.removeItem('token')
        next('/auth/sign-in')
      }
    },
  },
  {
    path: '/auth/sign-in',
    name: 'Login',
    component: () => import('@/modules/Auth/views/Sign-in.vue')
  },
  {
    path: '/auth/sign-up',
    component: () => import('@/modules/Auth/views/Sign-up.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
