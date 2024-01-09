import { useRouter } from 'vue-router'

export function useNavigation () {
  function goHome () {
    const router = useRouter()
    router.push('/')
  }
  function gotoPage (page: string) {
    const router = useRouter()
    router.push(page)
  }

  return {
    goHome,
    gotoPage
  }
}
