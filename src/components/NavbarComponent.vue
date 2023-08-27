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
      toggleNavbar
    }
  }
}
</script>

<template>
  <nav id="navbar">
    <div class="brand">
      <span role="button">
        <img src="@/assets/images/logo-especializati.png" alt="EspecializaTi Academy" />
      </span>
    </div>
    <div class="menu-wrapper" :class="{ active: active }">
      <span class="collapse-menu" role="button" @click.stop="toggleNavbar">
        <i class="fal fa-bars"></i>
      </span>
      <div class="menu-content">
        <div class="user-info">
          <img
            v-if="userStore.user?.image"
            :src="userStore.user?.image"
            :alt="userStore.user?.name"
          />
          <img v-else src="https://picsum.photos/200" :alt="userStore.user?.name" />
          <span class="title">Bem vindo!</span>
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

