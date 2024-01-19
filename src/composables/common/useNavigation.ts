import { useRouter } from 'vue-router'

export function useNavigation () {
  const router = useRouter()
  function goHome () {
    router.push('/')
  }
  function gotoPage (page: string) {
    router.push(page)
  }

  return {
    goHome,
    gotoPage
  }
}
