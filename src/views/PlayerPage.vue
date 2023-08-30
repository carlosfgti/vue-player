<script lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import HeaderComponent from '@/components/Player/HeaderComponent.vue'
import PlayerComponent from '@/components/Player/PlayerComponent.vue'
import AsideComponent from '@/components/Player/AsideComponent.vue'

export default {
  name: 'PlayerPage',
  setup() {},
  components: {
    NavbarComponent,
    HeaderComponent,
    PlayerComponent,
    AsideComponent
  }
}
</script>

<template>
  <div id="player-wrapper">
    <header>
      <NavbarComponent />
    </header>
    <AsideComponent />
    <!-- <main> -->
    <!-- <PlayerComponent /> -->
    <!-- </main> -->
  </div>
  <!-- <HeaderComponent /> -->
</template>

<style lang="scss" scoped>
@import '../styles/pages/PlayerPage.scss';
</style>
