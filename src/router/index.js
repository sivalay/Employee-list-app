import { createRouter, createWebHistory } from 'vue-router'

import AddView from '../components/AddView.vue'
import EmployeeList from '../components/EmployeeList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EmployeeList,
    },
    {
      path: '/add',
      name: 'addEmployee',
      component: AddView,
    },
  ],
})

export default router
