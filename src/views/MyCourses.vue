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
        <div class="image-course" :style="{backgroundColor: course.color}">
          <img :src="course.image" :alt="course.name" style="max-width: 200px;">
        </div>
        <div class="content-course">
          <div class="progress-bar">
            <div class="progress" :style="{width: `${courseStore.calcTotalCourseCompleted(course)}%`}"></div>
          </div>
          <h2>{{ course.name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
  color: #333; /* Text color */
  font-family: 'Helvetica', sans-serif;
}

.courses {
  display: inline-flex;
}
.course {
  margin: 10px;
  border: 1px solid #eaeaee;
  border-radius: 6px;
  background-color: #fafafa;
}

.content-course {
  padding: 4px;
}

/* Styles for the progress bar container */
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

/* Styles for the progress */
.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out; /* Add animation effect */
}

h2 {
  line-height: 25px;
  padding: 10px 0px;
  font-weight: 700;
  font-size: 16px;
  max-height: 65px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap: break-word;
}

</style>
