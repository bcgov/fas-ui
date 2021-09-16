<template>
    <div>11{{ display }}</div>
</template>
<script>
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
import useClock from '../../composables/Dashboard/useClock'
@Component({
  setup (_, context) {
    const { display } = useClock(_, context)
    return display
  }

})
// @Component({})
export default class Search extends Vue {
  get display () {
    return moment(Date.now()).format('HH:mm:ss')
  }

  created () {
    setInterval(() => {
      this.time = Date.now()
    }, 1000)
  }
}
// export default {
//   data () {
//     return {
//       time: Date.now()
//     }
//   },
//   computed: {
//     display () {
//       return moment(this.time).format('HH:mm:ss')
//     }
//   },
//   created () {
//     setInterval(() => {
//       this.time = Date.now()
//     }, 1000)
//   }
// }
</script>
