<script lang="ts">
import '@/assets/player.css'

import { useCoursesStore } from '@/store/courses'
import { storeToRefs } from 'pinia'

const courseStore = useCoursesStore()
const { courseSelected } = storeToRefs(courseStore)
console.log(courseSelected)
</script>

<template>
  <aside class="menu">
    <div class="menu__title">
      <h1>Aula - React</h1>
      <div class="status__bar">
        <div class="loading-background status__completed"></div>
      </div>
    </div>
    <ul class="menu__category-list scrollable-element">
      <li class="category-list__card">
        <div class="category-card__title">
          <h1>Módulo 1</h1>
        </div>
        <ul class="category-card__task-list">
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>Welcome to React.js</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
        </ul>
      </li>
      <li class="category-list__card">
        <div class="category-card__title">
          <h1>Módulo 2</h1>
        </div>
        <ul class="category-card__task-list">
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
          <li class="task-list__card">
            <input type="checkbox" name="completed" id="" />
            <p>States and immutability</p>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>
