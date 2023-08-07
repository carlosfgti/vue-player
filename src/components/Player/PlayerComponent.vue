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
    v-if="lessonStore.lessonPlayer === null"
    src="117908430"
    title="EspecializaTi"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    class="player"
  ></iframe>
  <iframe
    v-else
    :src="'https://player.vimeo.com/video/' + lessonStore.lessonPlayer.video"
    :title="lessonStore.lessonPlayer.url"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    class="player"
  ></iframe>
</template>
