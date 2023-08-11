<script lang="ts">
import '@/assets/player.css'
import { useCoursesStore } from '@/store/courses';
import { useLessonsStore } from '@/store/lessons';

export default {
  name: 'ContentComponent',
  setup() {
    const lessonStore = useLessonsStore()
    const courseStore = useCoursesStore()

    return {
      lessonStore,
      courseStore,
    }
  },
}
</script>

<template>
  <aside class="menu">
    <div class="menu__title">
      <h1>{{ lessonStore.title }}</h1>
      <div class="status__bar">
        <div class="loading-background status__completed" :style="{width: `${courseStore.totalCourseComplete}%`}"></div>
      </div>
    </div>
    <div v-if="courseStore.courseSelected === null">Carregando...</div>
    <ul v-else class="menu__category-list scrollable-element">
      <li v-for="(module, index) in courseStore.courseSelected.modules" :key="index" class="category-list__card">
        <div class="category-card__title">
          <h1>{{ module.name }}</h1>
        </div>
        <ul class="category-card__task-list" v-if="module.lessons !== null">
          <li v-for="lesson in module.lessons" :key="lesson.url" class="task-list__card">
            <input type="checkbox" name="completed" id="" :checked="lesson.views > 0" />
            <p @click.prevent="lessonStore.addLessonPlayer(lesson)" style="cursor: pointer;">{{ lesson.name }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>
