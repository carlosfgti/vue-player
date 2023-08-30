<script lang="ts">
import { useLessonsStore } from '@/store/lessons'

export default {
  name: 'PlayerComponent',
  setup() {
    const lessonStore = useLessonsStore()

    return {
      lessonStore
    }
  }
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
  <div></div>
  <div class="content-lesson">
    <div
      v-if="lessonStore.lessonPlayer?.description"
      v-html="lessonStore.lessonPlayer?.description"
    ></div>
    <div v-else>---</div>
  </div>
</template>
