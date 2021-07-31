import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class loaderModule extends VuexModule {
  // to keep track of the active calls and to show progress bar; used in app.vue globally
  activeCalls: number = 0

  get isThereActiveCalls (): boolean {
    return this.activeCalls > 0
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
