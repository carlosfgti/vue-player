<script setup lang="ts">
import '@/assets/main.css'
import '@/assets/button.css'
import '@/assets/environments.css'
import '@/assets/menu.css'
import '@/assets/reset.css'

import HeaderComponent from '@/components/Player/HeaderComponent.vue'
import PlayerComponent from '@/components/Player/PlayerComponent.vue'
import ContentComponent from '@/components/Player/ContentComponent.vue'
import { useLessonsStore } from '@/store/lessons'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const lessonStore = useLessonsStore()
const { lessonPlayer } = storeToRefs(lessonStore)
console.log(lessonPlayer)

onMounted(() => {
  lessonStore.findByURL('o-que-e-serverless')
})
</script>

<template>
  <HeaderComponent />
  <main>
    <PlayerComponent />
    <ContentComponent />
  </main>
</template>
