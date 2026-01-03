import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminIndex from '@/pages/admin/index.vue'
import UserIndex from '@/pages/admin/users/index.vue'

import home from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/admin',
    component: AdminLayout,
    children:[
      {
        path: "",
        component: AdminIndex
      },
      {
        path:"/admin/users",
        component: UserIndex
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
