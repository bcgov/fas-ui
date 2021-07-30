import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class loadingStatusModule extends VuexModule {
  // to show progress used in app.vue
  globalLoader: boolean = false

  @Mutation
  public setGlobalLoader (globalLoader: boolean): void {
    this.globalLoader = globalLoader
  }

  // We dont need two actions for now though - but open to extension in future.
  @Action({ rawError: true })
  public showGlobalLoader (): void {
    this.context.commit('setGlobalLoader', true)
  }

  @Action({ rawError: true })
  public closeGlobalLoader (): void {
    this.context.commit('setGlobalLoader', false)
  }
}
