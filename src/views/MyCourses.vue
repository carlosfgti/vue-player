<script lang="ts">
import type Course from '@/entities/Course'
import { useUsersStore } from '@/store/users'
import { useCoursesStore } from '@/store/courses'
import { onMounted, ref } from 'vue'
import router from '@/router'

export default {
  name: 'MyCourses',
  setup() {
    const courseStore = useCoursesStore()
    const loading = ref(false)
    const loadingGenerateCertificate = ref(false)
    const filter = ref('')
    const userStore = useUsersStore()

    const fetchMyCourses = (page: number, filter: string) => {
      loading.value = true
      courseStore.fetchMyCourses(page, filter).finally(() => loading.value = false)
    }

    onMounted(() => {
      fetchMyCourses(1, filter.value)
    })

    const setCourseSelected = (course: Course) => {
      courseStore.courseSelected = course

      router.push({ name: 'player' })
    }

    const nextPage = () => fetchMyCourses(courseStore.myCourses?.meta.nextPage ?? 1, filter.value)
    const previousPage = () => fetchMyCourses(courseStore.myCourses?.meta.previousPage ?? 1, filter.value)
    const getCertificate = (course: Course) => {
      loadingGenerateCertificate.value = true
      courseStore.generateCertificate(course).then(response => {
        // return router.push({name: 'certificate', params: {identify: response.data.data.identify}})
        const { href } = router.resolve({
          name: 'certificate',
          params: {identify: response.data.data.identify},
          query: { share: 1 },
        });

        window.open(href, '_blank');
      })
      .finally(() => loadingGenerateCertificate.value = false)
    }

    const logout = () => userStore.logout().then(() => router.push({name: 'login'}))

    return {
      courseStore,
      loading,
      setCourseSelected,
      nextPage,
      previousPage,
      getCertificate,
      loadingGenerateCertificate,
      userStore,
      logout
    }
  }
}
</script>

<template>
  <div>
    <div class="menu-home">
      <h1>Meus Cursos</h1>
      <div class="user">
        Olá, {{ userStore.user?.name }}!
        <img v-if="userStore.user?.image" :src="userStore.user?.image" :alt="userStore.user?.name">
        <ul>
          <li><a href="#" @click.prevent="logout">Sair</a></li>
        </ul>
      </div>
    </div>
    <div class="courses">
      <div class="loading" v-if="loading">Carregando os cursos</div>
      <div
        class="course"
        v-for="(course, index) in courseStore.myCourses?.data"
        :key="index">
        <div class="image-course" :style="{backgroundColor: course.color}">
          <img :src="course.image" :alt="course.name" style="max-width: 200px;" @click="setCourseSelected(course)">
        </div>
        <div class="content-course">
          <div class="progress-bar">
            <div class="progress" :style="{width: `${courseStore.calcTotalCourseCompleted(course)}%`}"></div>
          </div>
          <h2 @click="setCourseSelected(course)">{{ course.name }}</h2>
          <div
            v-if="courseStore.calcTotalCourseCompleted(course) >= 100"
            @click.prevent="getCertificate(course)" :class="{disable: loadingGenerateCertificate}">
            <span v-if="loadingGenerateCertificate">Gerando...</span>
            <span v-else>Certificado</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="courseStore.myCourses?.meta">
      <a href="#" @click.prevent="previousPage" :class="['prev', { 'disable-pagination': !courseStore.myCourses?.meta.hasPreviousPage }]">Voltar</a>
      <a href="#" @click.prevent="nextPage" :class="['next', { 'disable-pagination': !courseStore.myCourses?.meta.hasNextPage }]">Próxima</a>
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page,
.prev,
.next {
  padding: 6px 12px;
  margin: 0 3px;
  border: 1px solid #ccc;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.page:hover,
.prev:hover,
.next:hover {
  background-color: #f0f0f0;
}

.prev,
.next {
  background-color: #f0f0f0;
  color: #333;
}

.prev:hover,
.next:hover {
  background-color: #ddd;
}
.disable-pagination {
  background-color: #ccc;
  color: #888;
  cursor: not-allowed;
  pointer-events: none;
}

</style>
