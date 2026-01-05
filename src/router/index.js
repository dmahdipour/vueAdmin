import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminIndex from '@/pages/admin/IndexAdmin.vue'
import UserIndex from '@/pages/admin/users/IndexUser.vue'
import AddUser from '@/pages/admin/users/AddUser.vue'

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
        path:"users",
        name:'users',
        component: UserIndex
      },
      {
        path:"users/add",
        name:"addUser",
        component: AddUser
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
