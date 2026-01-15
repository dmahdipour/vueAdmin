import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

import AdminIndex from '@/pages/admin/IndexAdmin.vue'

import UserIndex from '@/pages/admin/users/IndexUser.vue'
import AddUser from '@/pages/admin/users/AddUser.vue'
import EditUser from '@/pages/admin/users/EditUser.vue'

import CategoryIndex from '@/pages/admin/categories/IndexCategory.vue'
import AddCategory from '@/pages/admin/categories/AddCategory.vue'
import EditCategory from '@/pages/admin/categories/EditCategory.vue'

import PostIndex from '@/pages/admin/posts/IndexPost.vue'
import AddPost from '@/pages/admin/posts/AddPost.vue'
import EditPost from '@/pages/admin/posts/EditPost.vue'

import HomePage from '@/pages/HomePage.vue'
import PostPage from '@/pages/Post/Index.vue'
import SearchPage from '@/pages/Post/SearchPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children:[
      {
        path:'',
        component: HomePage
      },
      {
        path:'post/:slug',
        name: 'singlePost',
        component: PostPage
      },
      {
        path:'search',
        name: 'searchPage',
        component: SearchPage
      },
    ]
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
  },

  {
    path:'/:pathMatch(.*)*',
    name:'notFound',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
