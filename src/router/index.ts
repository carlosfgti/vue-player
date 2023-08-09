import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '@/views/AuthPage.vue'
import Player from '@/views/PlayerPage.vue'
import { useUsersStore } from '@/store/users'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Auth
  },
  {
    path: '/',
    name: 'player',
    component: Player
  }
]

const router = createRouter({
  history: createWebHashHistory(),
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
      return router.push({ name: 'player' })
    }

    await userStore
      .getMe()
      .catch(() => {
        if (to.name != 'login') {
          return router.push({ name: 'login' })
        }
      })
      .then(() => {
        if (to.name != 'player') {
          return router.push({ name: 'player' })
        }
      })
  }

  return next()
})

export default router
