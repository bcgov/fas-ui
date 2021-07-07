
import { RouteConfig } from 'vue-router'
// auth
import SigninView from '@/views/auth/SigninView.vue'
import SignoutView from '@/views/auth/SignoutView.vue'

// Dasboard
import Dashboard from '../views/Dashboard.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes: Array<RouteConfig> = [
  { path: '/', name: 'root', redirect: 'home' },
  {
    path: '/home',
    name: 'home',
    component: Dashboard
  },
  {
    // router.beforeEach() routes here:
    path: '/signin/:idpHint',
    name: 'signin',
    component: SigninView,
    meta: {
      requiresAuth: false
    }
  },
  {
    // SbcHeader.logout() redirects here:
    path: '/signout',
    name: 'signout',
    component: SignoutView,
    meta: {
      requiresAuth: false
    }
  },
  { path: '*', name: 'notfound', component: PageNotFound }
]

export default routes
