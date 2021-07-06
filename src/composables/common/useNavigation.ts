export function useNavigation (_, context) {
  function goHome () {
    context.root.$router.push('/')
  }
  function gotoPage (page: string) {
    context.root.$router.push(page)
  }

  return {
    goHome,
    gotoPage
  }
}
