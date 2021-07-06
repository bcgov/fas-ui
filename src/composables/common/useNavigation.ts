
export function useNavigation (props, { root }) {
  function goHome () {
    root.$router.push('/')
  }
  function gotoPage (page:string) {
    root.$router.push(page)
  }

  return {
    goHome,
    gotoPage
  }
}
