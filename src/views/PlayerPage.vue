<script lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import PlayerComponent from '@/components/Player/PlayerComponent.vue'
import AsideComponent from '@/components/Player/AsideComponent.vue'

export default {
  name: 'PlayerPage',
  setup() {},
  components: {
    NavbarComponent,
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
    <main>
      <AsideComponent />
      <PlayerComponent />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/pages/PlayerPage.scss';
</style>
