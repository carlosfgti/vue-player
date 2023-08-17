<script lang="ts">
import '@/assets/player.css'
import router from '@/router';
import { useCoursesStore } from '@/store/courses';
import { useLessonsStore } from '@/store/lessons';
import { useUsersStore } from '@/store/users';
import { onMounted } from 'vue';

export default {
  name: 'ContentComponent',
  setup() {
    const lessonStore = useLessonsStore()
    const courseStore = useCoursesStore()
    const useStore = useUsersStore()

    const toMyCourses = () => router.push({name: 'my.courses'})
    const logout = () => {
      useStore.logout().then(() => router.push({name: 'login'}))
    }

    onMounted(() => {
      if (courseStore.courseSelected === null) {
        return toMyCourses()
      }
    })

    const openForum = () => window.open('https://academy.especializati.com.br/forum', '_blank')

    return {
      lessonStore,
      courseStore,
      toMyCourses,
      logout,
      openForum
    }
  },
}
</script>

<template>
  <aside class="menu">
    <div class="image-course" :style="{backgroundColor: courseStore.courseSelected?.color}">
      <img :src="courseStore.courseSelected?.image" :alt="courseStore.courseSelected?.name">
    </div>
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
      <div class="footer-sidebar">
      <h2 class="category-card__title">Outros links</h2>
      <ul>
        <li class="task-list__card">
          <p @click="toMyCourses" style="cursor: pointer;">Meus Cursos</p>
        </li>
        <li class="task-list__card">
          <p @click="openForum">Fórum</p>
        </li>
        <li class="task-list__card">
          <p @click="logout" style="cursor: pointer;">Sair</p>
        </li>
      </ul>
    </div>
    </ul>
  </aside>
</template>

<style scoped>
.image-course {
  max-width: 50px;
  padding: 10px;
  border-radius: 10px;
  margin: 0 auto;
}
.image-course img {
  width: 100%;
}
</style>
