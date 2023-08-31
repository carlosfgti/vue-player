<script lang="ts">
import type Module from '@/entities/Module'
import router from '@/router'
import { useCoursesStore } from '@/store/courses'
import { useLessonsStore } from '@/store/lessons'
import { onMounted } from 'vue'

export default {
  name: 'AsideComponent',
  setup() {
    const lessonStore = useLessonsStore()
    const courseStore = useCoursesStore()

    const toMyCourses = () => router.push({ name: 'my.courses' })

    onMounted(() => {
      if (courseStore.courseSelected === null) return toMyCourses()
    })

    const openForum = () => window.open('https://academy.especializati.com.br/forum', '_blank')

    const toggleModule = (moduleItem: Module) => {
      moduleItem.open = !moduleItem.open
    }

    return {
      lessonStore,
      courseStore,
      toMyCourses,
      openForum,
      toggleModule
    }
  }
}
</script>

<template>
  <aside v-if="courseStore.courseSelected">
    <div class="course-details">
      <div
        class="progress-bar"
        :style="{
          background: `
            conic-gradient(var(--primary) ${Math.floor(
              courseStore.totalCourseComplete
            )}%, transparent 0)
          `
        }"
      >
        <figure :style="{ backgroundColor: courseStore.courseSelected?.color }">
          <img :src="courseStore.courseSelected?.image" :alt="courseStore.courseSelected?.name" />
        </figure>
      </div>
      <div class="info">
        <h3 class="title">{{ courseStore.courseSelected?.name }}</h3>
        <span>{{ `${Math.floor(courseStore.totalCourseComplete)}%` }} concluído</span>
        <ul role="list">
          <li role="button" @click="toMyCourses" title="Meus cursos">
            <i class="fas fa-books"></i>
          </li>
          <li role="button" @click="openForum" title="Abrir fórum">
            <i class="fab fa-discourse"></i>
          </li>
        </ul>
      </div>
    </div>
    <hr />
    <div class="module-content">
      <ul class="modules" role="list">
        <li
          v-for="(moduleItem, index) in courseStore.courseSelected.modules"
          :key="index"
          class="module-category"
          :class="{ active: moduleItem.open }"
        >
          <div class="title" role="button" @click.stop="toggleModule(moduleItem)">
            <span>{{ moduleItem.name }}</span>
            <i class="fas fa-caret-right"></i>
          </div>
          <ul class="module-lessons" role="list">
            <li v-for="lesson in moduleItem.lessons" :key="lesson.url" class="module-item">
              <div
                class="title-content"
                role="button"
                @click.stop="lessonStore.addLessonPlayer(lesson)"
                :class="{ active: lessonStore.lessonPlayer == lesson }"
              >
                <i class="check fas fa-check" :class="{ active: lesson.views > 0 }"></i>
                <span class="">{{ lesson.name }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import '../../styles/components/AsideComponent.scss';
</style>

