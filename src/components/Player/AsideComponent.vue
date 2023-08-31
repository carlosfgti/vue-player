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
      if (courseStore.courseSelected === null) {
        return toMyCourses()
      }
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
    <!-- <h1>{{ lessonStore.title }}</h1> -->

    <!-- <div v-if="courseStore.courseSelected === null">Carregando...</div> -->
    <!-- <ul v-else class="menu__category-list scrollable-element">
      <li
        v-for="(module, index) in courseStore.courseSelected.modules"
        :key="index"
        class="category-list__card"
      >
        <div class="category-card__title">
          <h1>{{ module.name }}</h1>
        </div>
        <ul class="category-card__task-list" v-if="module.lessons !== null">
          <li v-for="lesson in module.lessons" :key="lesson.url" class="task-list__card">
            <input type="checkbox" name="completed" id="" :checked="lesson.views > 0" />
            <p @click.prevent="lessonStore.addLessonPlayer(lesson)" style="cursor: pointer">
              {{ lesson.name }}
            </p>
          </li>
        </ul>
      </li>
      <div class="footer-sidebar">
        <h2 class="category-card__title">Outros links</h2>
        <ul>
          <li class="task-list__card">
            <p @click="toMyCourses" style="cursor: pointer">Meus Cursos</p>
          </li>
          <li class="task-list__card">
            <p @click="openForum">Fórum</p>
          </li>
          <li class="task-list__card">
            <p @click="logout" style="cursor: pointer">Sair</p>
          </li>
        </ul>
      </div>
    </ul> -->
  </aside>
</template>

<style lang="scss" scoped>
@import '../../styles/components/AsideComponent.scss';
</style>

