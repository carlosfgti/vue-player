<script lang="ts">
import '@/assets/main.css'
import '@/assets/button.css'
import '@/assets/environments.css'
import '@/assets/menu.css'
import '@/assets/reset.css'

import HeaderComponent from '@/components/Player/HeaderComponent.vue'
import PlayerComponent from '@/components/Player/PlayerComponent.vue'
import ContentComponent from '@/components/Player/ContentComponent.vue'

// import { onMounted } from 'vue'
// import { useCoursesStore } from '@/store/courses'

// // const lessonStore = useLessonsStore()
// const courseStore = useCoursesStore()

// onMounted(() => {
//   courseStore.getCourse('aws-ec2-escalabilidade-e-alta-disponibilidade')
// })

export default {
  name: 'PlayerPage'
}
</script>

<template>
  <HeaderComponent />
  <main>
    <PlayerComponent />
    <ContentComponent />
  </main>
</template>
