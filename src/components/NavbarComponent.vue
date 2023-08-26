<script lang="ts">
import { useUsersStore } from '@/store/users'
import router from '@/router'

export default {
  name: 'NavbarComponent',
  setup() {
    const userStore = useUsersStore()

    const logout = () => {
      userStore.logout().then(() => router.push({ name: 'login' }))
    }

    return {
      userStore,
      logout
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
    <div class="menu-wrapper">
      <span class="collapse-menu" role="button">
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

