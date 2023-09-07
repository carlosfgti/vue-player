import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '@/store/users'

import Auth from '@/views/AuthPage.vue'
import Player from '@/views/PlayerPage.vue'
import MyCourses from '@/views/MyCourses.vue'
import Certificate from '@/views/CertificatePage.vue'
import UserBlock from '@/views/UserBlock.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Auth,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'my.courses',
    component: MyCourses,
    meta: { requiresAuth: true }
  },
  {
    path: '/player',
    name: 'player',
    component: Player,
    meta: { requiresAuth: true }
  },
  {
    path: '/certificado/:identify',
    name: 'certificate',
    component: Certificate,
    meta: { requiresAuth: false }
  },
  {
    path: '/block',
    name: 'block',
    component: UserBlock,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _, next) => {
  const userStore = useUsersStore()
  const user = userStore.user

  if (to.meta.requiresAuth && to.name != 'reset.password' && user === null) {
    const token = localStorage.getItem('_oauth')
    if (token === null && to.name != 'login') {
      return router.push({ name: 'login' })
    } else if (token !== null && to.name !== 'login') {
      await userStore
        .getMe()
        .then(() => {
          if (to.name != 'my.courses') {
            return router.push({ name: 'my.courses' })
          }
        })
        .catch(() => {
          if (to.name !== 'login') {
            return router.push({ name: 'login' })
          }
        })
    }
  }

  if (user !== null && to.name === 'login') {
    return router.push({ name: 'my.courses' })
  }

  return next()
})

export default router
