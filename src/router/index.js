// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from '../components/AdminLogin.vue'
import AdminDashboard from '../components/AdminDashboard.vue'

// Admin route guard
const adminGuard = (to, from, next) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated')
  if (isAuthenticated) {
    next()
  } else {
    next('/admin')
  }
}

const routes = [
  // Admin routes
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    beforeEnter: adminGuard
  },
  // Add a catch-all route that redirects to your main app
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router