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
  <div class="player-content">
    <div v-if="lessonStore.video" class="player">
      <iframe
        :src="lessonStore.video"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        width="100%"
        height="100%"
      ></iframe>
    </div>
    <div class="navigator">
      <!-- TODO: Disable these buttons when the prev and next course doesn't exit -->
      <button
        class="btn"
        v-if="lessonStore.lessonPlayer"
        @click="lessonStore.previousLesson(lessonStore.lessonPlayer)"
        :disabled="false"
      >
        <i class="fas fa-chevron-left"></i>
        Aula Anterior
      </button>
      <button
        class="btn"
        v-if="lessonStore.lessonPlayer"
        @click="lessonStore.nextLesson(lessonStore.lessonPlayer)"
        :disabled="false"
      >
        Próxima Aula
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <!-- TODO: Could be these content a clickable link?-->
    <div v-if="lessonStore.lessonPlayer" class="content-lesson">
      <div
        v-if="lessonStore.lessonPlayer.description"
        v-html="lessonStore.lessonPlayer.description"
      ></div>
      <div v-else>---</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/components/PlayerComponent.scss';
</style>

