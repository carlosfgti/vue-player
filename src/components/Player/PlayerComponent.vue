<script lang="ts">
import '@/assets/player.css'
import { useLessonsStore } from '@/store/lessons'

export default {
  name: 'PlayerComponent',
  setup() {
    const lessonStore = useLessonsStore()

    return {
      lessonStore
    }
  },
}
</script>

<template>
  <iframe
    :src="lessonStore.video"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    class="player"
  ></iframe>
</template>
