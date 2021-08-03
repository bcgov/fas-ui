/* Indicator hold indicator state such as active api calls and reponse error that can be indicated in the system */

import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class indicatorModule extends VuexModule {
  // to keep track of the active calls and to show progress bar; used in app.vue globally
  activeCalls: number = 0
  // to display 500 error as a global alert if the axios response failsyeah
  hasCallFailed: boolean = false

  get isThereActiveCalls (): boolean {
    return this.activeCalls > 0
  }

  @Mutation
  public setHasCallFailed (hasCallFailed: boolean): void {
    this.hasCallFailed = hasCallFailed
  }

  @Mutation
  public incrementActiveCalls (): void {
    this.activeCalls++
  }

  @Mutation
  public decrementActiveCalls (): void {
    this.activeCalls--
  }
}
