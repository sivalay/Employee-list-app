import { createRouter, createWebHistory } from 'vue-router'
import EmployeeLIst from '../components/EmployeeList.vue'
import AddView from '../components/AddView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EmployeeLIst,
    },
    {
      path: '/add',
      name: 'add-emp',
      component: AddView,
    },
  ],
})

export default router
