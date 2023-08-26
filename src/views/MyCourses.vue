<script lang="ts">
import type Course from '@/entities/Course'
import { useUsersStore } from '@/store/users'
import { useCoursesStore } from '@/store/courses'
import { onMounted, ref } from 'vue'
import router from '@/router'
import NavbarComponent from '@/components/NavbarComponent.vue'

export default {
  name: 'MyCourses',

  setup() {
    const courseStore = useCoursesStore()
    const loading = ref(false)
    const loadingGenerateCertificate = ref(false)
    const filter = ref('')

    const fetchMyCourses = (page: number, filter: string) => {
      loading.value = true
      courseStore.fetchMyCourses(page, filter).finally(() => (loading.value = false))
    }

    onMounted(() => {
      fetchMyCourses(1, filter.value)
    })

    const setCourseSelected = (course: Course) => {
      courseStore.courseSelected = course
      router.push({ name: 'player' })
    }

    const nextPage = () => {
      fetchMyCourses(courseStore.myCourses?.meta.nextPage ?? 1, filter.value)
    }

    const previousPage = () => {
      fetchMyCourses(courseStore.myCourses?.meta.previousPage ?? 1, filter.value)
    }

    const getCertificate = (course: Course) => {
      loadingGenerateCertificate.value = true
      courseStore
        .generateCertificate(course)
        .then((response) => {
          const { href } = router.resolve({
            name: 'certificate',
            params: { identify: response.data.data.identify },
            query: { share: 1 }
          })

          window.open(href, '_blank')
        })
        .finally(() => (loadingGenerateCertificate.value = false))
    }

    return {
      courseStore,
      loading,
      setCourseSelected,
      nextPage,
      previousPage,
      getCertificate,
      loadingGenerateCertificate
    }
  },

  components: {
    NavbarComponent
  }
}
</script>

<template>
  <div id="my-courses-wrapper">
    <header>
      <NavbarComponent />
    </header>
    <main>
      <div class="courses">
        <div class="loading" v-if="loading">Carregando os cursos</div>
        <div class="course" v-for="(course, index) in courseStore.myCourses?.data" :key="index">
          <div class="image-course" :style="{ backgroundColor: course.color }">
            <img
              :src="course.image"
              :alt="course.name"
              style="max-width: 200px"
              @click="setCourseSelected(course)"
            />
          </div>
          <div class="content-course">
            <div class="progress-bar">
              <div
                class="progress"
                :style="{ width: `${courseStore.calcTotalCourseCompleted(course)}%` }"
              ></div>
            </div>
            <h2 @click="setCourseSelected(course)">{{ course.name }}</h2>
            <div
              v-if="courseStore.calcTotalCourseCompleted(course) >= 100"
              @click.prevent="getCertificate(course)"
              :class="{ disable: loadingGenerateCertificate }"
            >
              <span v-if="loadingGenerateCertificate">Gerando...</span>
              <span v-else>Certificado</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination" v-if="courseStore.myCourses?.meta">
        <a
          href="#"
          @click.prevent="previousPage"
          :class="['prev', { 'disable-pagination': !courseStore.myCourses?.meta.hasPreviousPage }]"
          >Voltar</a
        >
        <a
          href="#"
          @click.prevent="nextPage"
          :class="['next', { 'disable-pagination': !courseStore.myCourses?.meta.hasNextPage }]"
          >Próxima</a
        >
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/pages/MyCourses.scss';
</style>
