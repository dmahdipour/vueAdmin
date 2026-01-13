import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminIndex from '@/pages/admin/IndexAdmin.vue'

import UserIndex from '@/pages/admin/users/IndexUser.vue'
import AddUser from '@/pages/admin/users/AddUser.vue'
import EditUser from '@/pages/admin/users/EditUser.vue'

import CategoryIndex from '@/pages/admin/categories/IndexCategory.vue'
import AddCategory from '@/pages/admin/categories/AddCategory.vue'
import EditCategory from '@/pages/admin/categories/EditCategory.vue'

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
      },
      {
        path:"users/edit/:id?",
        name:"editUser",
        component: EditUser
      },
      
      {
        path:"categories",
        name:'categories',
        component: CategoryIndex
      },
      {
        path:"categories/add",
        name:"addCategory",
        component: AddCategory
      },
      {
        path:"categories/edit/:id?",
        name:"editCategory",
        component: EditCategory
      },
      
      {
        path:"posts",
        name:'posts',
        component: PostIndex
      },
      {
        path:"posts/add",
        name:"addPost",
        component: AddPost
      },
      {
        path:"posts/edit/:id?",
        name:"editPost",
        component: EditPost
      },
      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
