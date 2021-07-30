import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class loadingStatusModule extends VuexModule {
  // to show progress used in app.vue
  globalLoader: boolean = false
  // to show progress in an individual component
  localLoader: boolean = false

  @Mutation
  public setGlobalLoader (globalLoader: boolean): void {
    this.globalLoader = globalLoader
  }

  @Mutation
  public setLocalLoader (localLoader: boolean): void {
    this.localLoader = localLoader
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
