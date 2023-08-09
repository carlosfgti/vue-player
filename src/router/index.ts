import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '@/views/AuthPage.vue'
import Player from '@/views/PlayerPage.vue'

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
  if (to.name != 'login') {
    return router.push({ name: 'login' })
  }

  next()
})

export default router
