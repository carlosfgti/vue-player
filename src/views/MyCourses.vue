<script lang="ts">
import type Course from '@/entities/Course'
import { useCoursesStore } from '@/store/courses'
import { onMounted, ref } from 'vue'
import router from '@/router'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useLessonsStore } from '@/store/lessons'

export default {
  name: 'MyCourses',

  setup() {
    const courseStore = useCoursesStore()
    const lessonStore = useLessonsStore()
    const loading = ref(false)
    const filter = ref('')

    const fetchMyCourses = (page: number, filter: string) => {
      loading.value = true
      courseStore
        .fetchMyCourses(page, filter)
        .catch((error) => {
          if (error.response.status === 403 && error.response.data.user_blocked === true) {
            router.push({ name: 'block' })
          }
        })
        .finally(() => {
          loading.value = false
          calcProgressBar()
        })
    }

    onMounted(() => {
      fetchMyCourses(1, filter.value)
    })

    const setCourseSelected = (course: Course) => {
      courseStore.courseSelected = course
      // clear lesson in player
      lessonStore.lessonPlayer = null
      router.push({ name: 'player' })
    }

    const nextPage = () => {
      fetchMyCourses(courseStore.myCourses?.meta.nextPage || 1, filter.value)
    }

    const previousPage = () => {
      fetchMyCourses(courseStore.myCourses?.meta.previousPage || 1, filter.value)
    }

    const getCertificate = (course: Course) => {
      course.loadingGenerateCertificate = true

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
        .finally(() => {
          course.loadingGenerateCertificate = false
        })
    }

    const calcProgressBar = () => {
      setTimeout(() => {
        const bar = document.querySelectorAll('.bar')

        bar.forEach((itemBar: any) => {
          const width = itemBar.getAttribute('data-percent')
          itemBar.style.width = `${width}%`
        })
      }, 100)
    }

    return {
      courseStore,
      loading,
      setCourseSelected,
      nextPage,
      previousPage,
      getCertificate,
      filter,
      fetchMyCourses
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
      <div class="content">
        <span class="page-title" v-if="loading">Carregando...</span>
        <span class="page-title" v-else>
          <i class="fas fa-books"></i>
          Meus Cursos
        </span>
        <form class="filter" action="#" method="get" @submit.prevent="fetchMyCourses(1, filter)">
          <div class="search-controll">
            <input
              type="text"
              name="filter"
              placeholder="Buscar Cursos (enter)"
              v-model="filter"
              :class="['filter', { searching: loading }]"
            />
            <button type="submit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>
        <div class="courses">
          <div
            class="card"
            v-for="(course, index) in courseStore.myCourses?.data"
            :key="index"
            role="button"
            @click.stop="setCourseSelected(course)"
          >
            <div class="header" :style="{ backgroundColor: course.color }">
              <img :src="course.image" :alt="course.name" style="max-width: 200px" />
            </div>
            <div
              class="progress"
              :class="{ hidden: courseStore.calcTotalCourseCompleted(course) < 1 }"
            >
              <span class="bar" :data-percent="courseStore.calcTotalCourseCompleted(course)"></span>
            </div>
            <div class="body">
              <h3 class="name">{{ course.name }}</h3>
              <div class="description" v-html="course.description"></div>
            </div>
            <div class="footer">
              <button
                role="button"
                v-if="courseStore.calcTotalCourseCompleted(course) >= 100"
                @click.stop="getCertificate(course)"
                class="btn"
                :disabled="course.loadingGenerateCertificate"
              >
                <span v-if="course.loadingGenerateCertificate">Gerando...</span>
                <span v-else>
                  <i class="fas fa-graduation-cap"></i>
                  Certificado
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="pagination" v-if="courseStore.myCourses?.meta">
          <button
            class="btn prev"
            @click.stop="previousPage"
            :disabled="!courseStore.myCourses?.meta.hasPreviousPage"
          >
            <i class="fas fa-chevron-left"></i>
            <span>Voltar</span>
          </button>
          <button
            class="btn next"
            @click.stop="nextPage"
            :disabled="!courseStore.myCourses?.meta.hasNextPage"
          >
            <span>Próxima</span>
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/pages/MyCoursesPage.scss';
</style>
