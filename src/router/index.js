import { createRouter, createWebHistory } from 'vue-router'
import CourseList from '../views/CourseList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CourseList
    }
  ]
})

export default router
