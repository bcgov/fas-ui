/*eslint-disable */
/* Library build set up for fas-search-components.
  build library using vue-cli-service
  Basic set up of included files store and i18n included here
  How to use :
  inside main.ts  `import Search from 'fas-ui'`
  Vue.use(Search, { store, i18n })
  include style if needed either 
  import 'fas-ui/fas-lib/fas-ui.css'
  or inside component style tag us,
  @import '~fas-ui/fas-lib/fas-ui.css';
  */
import OurVue from 'vue'
import Search from '@/components/Dashboard/Search.vue'
import VueCompositionAPI from '@vue/composition-api'
// stores needed fro search
import routingSlip from '@/store/modules/routingSlip'
import codes from '@/store/modules/codes'
import indicator from '@/store/modules/indicator'
// lang files
import i18n from '@/plugins/i18n'

/**
 * install function
 *
 * @param {*} Vue parent component vue instance
 * @param {*} optionsneed store and i18n
 */
function install(Vue, options) {
  if (OurVue !== Vue) {
    console.error(`Multiple instances of Vue detected `)
  }
  /*eslint-disable */
  if (install.installed) return
  install.installed = true
  // TODO check before use
  // if parent is not using VueCompositionAPI api need to push to vue
  Vue.use(VueCompositionAPI)

  // simple hack to inject locale messages. check for better solutions
  // this will not work when chaging lang.
  // need to updated code (since we are not using other lag now, not updating chanegs)
  if (options.i18n && i18n && i18n.messages) {
    options.i18n.mergeLocaleMessage(
      options.i18n.locale,
      i18n.messages[i18n.locale]
    )
  } else {
    console.error('please provide i18n')
  }
  // pushing store modules to parent store
  // use unique name to avoid conflict
  if (options.store) {
    options.store.registerModule('indicator', indicator)
    options.store.registerModule('routingSlip', routingSlip)
    options.store.registerModule('fasCodes', codes)
    // options.store.registerModule('store', store)
    window.fasStore = options.store
  } else {
    console.error('please provide store')
  }
  // registering component
  Vue.component('fas-search-component', Search)
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

Search.install = install

export default Search
