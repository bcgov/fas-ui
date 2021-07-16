import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class loadingStatusModule extends VuexModule {
  isLoading: boolean = false

  @Mutation
  public setIsLoading (isLoading: boolean): void {
    this.isLoading = isLoading
  }

  // We dont need two actions for now though - but open to extension in future.
  @Action({ rawError: true })
  public showLoadingState (): void {
    this.context.commit('setIsLoading', true)
  }

  @Action({ rawError: true })
  public closeLoadingState (): void {
    this.context.commit('setIsLoading', false)
  }
}
