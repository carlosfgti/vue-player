<script setup lang="ts">
import '@/assets/main.css'
import '@/assets/button.css'
import '@/assets/environments.css'
import '@/assets/menu.css'
import '@/assets/reset.css'

import HeaderComponent from '@/components/Player/HeaderComponent.vue';
import PlayerComponent from '@/components/Player/PlayerComponent.vue';
import ContentComponent from '@/components/Player/ContentComponent.vue';
</script>

<template>
  <HeaderComponent />
  <main>
    <PlayerComponent />
    <ContentComponent />
  </main>
</template>
