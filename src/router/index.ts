import KeyCloakService from 'sbc-common-components/src/services/keycloak.services'
import { createRouter, createWebHistory } from 'vue-router'
import { SessionStorageKeys } from '@/util/constants'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // If the user is authenticated;
  //    If there are allowed or disabled roles specified on the route check if the user has those roles else route to unauthorized
  // If the user is not authenticated
  //    Redirect the user to unauthorized page
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!sessionStorage.getItem(SessionStorageKeys.KeyCloakToken) || !KeyCloakService.verifyRoles(to.meta.allowedRoles, [])) {
      return next({
        path: '/unauthorized'
      })
    }
  }
  next()
})

export default router
