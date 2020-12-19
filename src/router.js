import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('@/views/dashboard/Index')
const Dashboard = () => import('@/views/dashboard/Dashboard')
const UserProfile = () => import('@/views/dashboard/pages/UserProfile')
const Login = () => import('@/views/dashboard/pages/WelcomePage')
const NotFound = () => import('@/views/Notfound')
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
    {
      path: '/not_found',
      name: 'NotFound',
      component: NotFound,
      props: true,
    },
    {
      path: '*',
      redirect: { name: 'NotFound', params: { resource: 'page' } },
    },
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
          name: 'Accounts',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
      ],
    },

  ],
})

router.beforeEach(async (to, from, next) => {
  next()
  console.log(
    `Router::beforeEach:: ${to.name} from ${from.name}\n  at ${new Date(
      Date.now(),
    ).toDateString()}`,
  )
  if (to.name === 'Login') {
    // TODO: check again
    const token = localStorage.getItem('token')
    if (token) {
      next({ name: 'Dashboard' })
    }
  }
})

export default router
