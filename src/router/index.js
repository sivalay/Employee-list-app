import { createRouter, createWebHistory } from 'vue-router'

import AddView from '../components/AddView.vue'
import EmployeeList from '../components/EmployeeList.vue'
import EditView from '../components/EditView.vue'

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
    {
      path: '/edit/:id',
      name: 'editView',
      component: EditView,
    },
  ],
})

export default router
