<script lang="ts">
import { useUsersStore } from '@/store/users'
import { ref } from 'vue'
import router from '@/router'

export default {
  name: 'NavbarComponent',
  setup() {
    const userStore = useUsersStore()
    const active = ref(false)

    const logout = () => {
      userStore.logout().then(() => router.push({ name: 'login' }))
    }

    const toggleNavbar = () => {
      active.value = !active.value
    }

    const affix = () => {
      const navbar = document.getElementById('navbar')
      if (!navbar) return

      if (window.scrollY > 0) navbar.classList.add('affix')
      else navbar.classList.remove('affix')
    }

    window.onscroll = () => affix()

    window.addEventListener('click', (e: any) => {
      e.stopPropagation()
      if (e.target.classList.contains('menu-content')) return
      if (e.target.classList.contains('user-info')) return
      if (e.target.classList.contains('nav-item')) return
      if (active.value) toggleNavbar()
    })

    return {
      userStore,
      logout,
      active,
      toggleNavbar,
      router
    }
  }
}
</script>

<template>
  <nav id="navbar">
    <div class="brand">
      <span role="button" @click.stop="router.push({ name: 'my.courses' })">
        <img src="@/assets/images/logo-especializati.png" alt="EspecializaTi Academy" />
      </span>
    </div>
    <div v-if="userStore.user" class="menu-wrapper" :class="{ active: active }">
      <span class="collapse-menu" role="button" @click.stop="toggleNavbar">
        <i class="fal fa-bars"></i>
      </span>
      <div class="menu-content">
        <div class="user-info">
          <img
            :src="userStore.user.image || 'https://picsum.photos/200'"
            :alt="userStore.user.name"
            onerror="javascript:this.src='https://picsum.photos/200'"
          />
          <span class="title">Bem vindo(a)!</span>
          <span class="name">{{ userStore.user?.name }}!</span>
        </div>
        <ul class="nav" role="list">
          <li class="nav-item" role="button" @click.stop="logout">
            <span>Sair</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../styles/components/NavbarComponent.scss';
</style>
