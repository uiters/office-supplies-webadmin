import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('@/views/dashboard/Index')
const Dashboard = () => import('@/views/dashboard/Dashboard')
const UserProfile = () => import('@/views/dashboard/pages/UserProfile')
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: Dashboard,
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: UserProfile,
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
      ],
    },
  ],
})
