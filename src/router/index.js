import { createRouter, createWebHistory } from 'vue-router'
import CourseList from '../views/CourseList.vue'
import CourseDetail from '../views/CourseDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/courses'
    },
    { path: '/:pathMatch(.*)*', redirect: '/courses' },
    {
      path: '/courses',
      name: 'courses',
      component: CourseList
    },
    {
      path: '/course/:id',
      name: 'course',
      component: CourseDetail
    }
  ]
})
export default router
