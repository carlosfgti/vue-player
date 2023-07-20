<script lang="ts">
import '@/assets/player.css'

import { useCoursesStore } from '@/store/courses'
import { storeToRefs } from 'pinia'

const courseStore = useCoursesStore()
const { courseSelected } = storeToRefs(courseStore)
console.log(courseSelected)
</script>

<template>
  <iframe
    :src="courseSelected.video"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    title="Young.Sheldon.S05E09.1080p.WEB-DL.DUAL"
    class="player"
  ></iframe>
</template>
