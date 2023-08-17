import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '@/store/users'

import Auth from '@/views/AuthPage.vue'
import Player from '@/views/PlayerPage.vue'
import MyCourses from '@/views/MyCourses.vue'
import Certificate from '@/views/CertificatePage.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Auth
  },
  {
    path: '/',
    name: 'my.courses',
    component: MyCourses
  },
  {
    path: '/player',
    name: 'player',
    component: Player
  },
  {
    path: '/certificado/:identify',
    name: 'certificate',
    component: Certificate
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _, next) => {
  const userStore = useUsersStore()
  const user = userStore.user

  if (to.name != 'reset.password' && user === null) {
    const token = localStorage.getItem('_oauth')
    if (token === null && to.name != 'login') {
      return router.push({ name: 'login' })
    } else if (token !== null && user !== null && to.name === 'login') {
      return router.push({ name: 'my.courses' })
    } else if (token !== null && user === null && to.name !== 'login') {
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

  return next()
})

export default router
