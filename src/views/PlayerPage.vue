<script lang="ts">
import HeaderComponent from '@/components/Player/HeaderComponent.vue'
import PlayerComponent from '@/components/Player/PlayerComponent.vue'
import ContentComponent from '@/components/Player/ContentComponent.vue'

export default {
  name: 'PlayerPage',
  setup() {},
  components: {
    HeaderComponent,
    PlayerComponent,
    ContentComponent
  }
}
</script>

<template>
  <HeaderComponent />
  <main>
    <PlayerComponent />
    <ContentComponent />
  </main>
</template>
