<script lang="ts">
import type Course from '@/entities/Course'
import { useCoursesStore } from '@/store/courses'
import { onMounted, ref } from 'vue'
import router from '@/router'

export default {
  name: 'MyCourses',
  setup() {
    const courseStore = useCoursesStore()
    const loading = ref(true)

    onMounted(() => {
      courseStore.fetchMyCourses().finally(() => loading.value = false)
    })

    const setCourseSelected = (course: Course) => {
      courseStore.courseSelected = course

      router.push({ name: 'player' })
    }

    return {
      courseStore,
      loading,
      setCourseSelected
    }
  }
}
</script>

<template>
  <div>
    <h1>Meus Cursos</h1>
    <div class="courses">
      <div class="loading" v-if="loading">Carregando os cursos</div>
      <div
        class="course"
        v-for="(course, index) in courseStore.myCourses?.data"
        :key="index"
        @click="setCourseSelected(course)">
        <h2>{{ course.name }}</h2>
      </div>
    </div>
  </div>
</template>