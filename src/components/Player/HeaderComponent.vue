<script lang="ts">
import { useLessonsStore } from '@/store/lessons'

export default {
  name: 'HeaderComponent',
  setup() {
    const storeLesson = useLessonsStore()

    return {
      storeLesson
    }
  }
}
</script>

<template>
  <header class="header_player">
    <div class="header_home"></div>
    <nav class="button-group">
      <button
        class="button button--outline"
        v-if="storeLesson.lessonPlayer"
        @click="storeLesson.previousLesson(storeLesson.lessonPlayer)"
      >
        Aula Anterior
      </button>
      <button
        class="button button--primary"
        v-if="storeLesson.lessonPlayer"
        @click="storeLesson.nextLesson(storeLesson.lessonPlayer)"
      >
        Próxima Aula
      </button>
    </nav>
  </header>
</template>
