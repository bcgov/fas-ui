import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import { BaseVDataTable } from '@/components/datatable'
import CommonUtils from '@/util/common-util'
import ShortNameAccountLink from '@/components/eft/ShortNameAccountLink.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import { axios } from '@/util/http-util'
import { baseVdataTable } from '../../test-data/baseVdata'
import can from '@/directives/can'
import sinon from 'sinon'
import { MockEFTLinksData } from '../../test-data/mock-eft-links'
import { waitForLoading } from '../../util/helper-functions'

Vue.use(Vuetify)
Vue.use(VueRouter)

// Selectors
const { header, headerTitles, itemRow, itemCell } = baseVdataTable
const headers = ['Linked Account', 'Branch', 'Unpaid Statement Number', 'Amount Owing', 'Actions']
const enum PaymentActions {
  UNLINK_ACCOUNT = 'Unlink Account',
  CANCEL_PAYMENT = 'Cancel Payment',
  APPLY_ALL_PAYMENTS = 'Apply All',
  APPLY_PAYMENT = 'Apply Payment'
}

describe('ShortNameAccountLink.vue', () => {
  let wrapper: any
  const localVue = createLocalVue()
  localVue.directive('can', can)
  const vuetify = new Vuetify({})
  let sandbox: any
  let linksResponse: any
  let summariesResponse: any = MockEFTLinksData.DEFAULT_SUMMARY

  beforeEach(async () => {
    sandbox = sinon.createSandbox()
    const get = sandbox.stub(axios, 'get')
    get.withArgs(sinon.match(/links/)).callsFake(() =>
      Promise.resolve({ data: linksResponse })
    )
    get.withArgs(sinon.match(/summaries/)).callsFake(() =>
      Promise.resolve({ data: summariesResponse })
    )

    wrapper = mount(ShortNameAccountLink, {
      propsData: {
        shortNameDetails: { shortName: null, id: null }
      },
      localVue,
      vuetify
    })
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    summariesResponse = MockEFTLinksData.DEFAULT_SUMMARY
    linksResponse = null

    wrapper.destroy()
    sessionStorage.clear()
    sandbox.restore()

    vi.resetModules()
    vi.clearAllMocks()
  })

  it('is a Vue instance', () => {
    const $t = () => ''
    wrapper = mount(ShortNameAccountLink, {
      localVue,
      vuetify,
      propsData: {
        shortNameDetails: { shortName: 'SHORTNAME' }
      },
      mocks: { $t }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('validate shortname initial mount as unlinked', () => {
    const $t = () => ''
    wrapper = mount(ShortNameAccountLink, {
      localVue,
      vuetify,
      propsData: {
        shortNameDetails: { shortName: 'SHORTNAME' }
      },
      mocks: { $t }
    })
    expect(wrapper.find('.unlinked-text').text())
      .toContain('This short name is not linked with an account.')
    expect(wrapper.find('#link-shortname-btn').exists()).toBe(true)
    expect(wrapper.findComponent(BaseVDataTable).exists()).toBe(false)
  })

  it('validate links - no links', async () => {
    linksResponse = { ...MockEFTLinksData.NO_LINKS }
    // Change the prop value
    await initializeProps(wrapper)
    await waitForLoading(wrapper)

    expect(wrapper.find('.unlinked-text').text())
      .toContain('This short name is not linked with an account.')
    expect(wrapper.find('#link-shortname-btn').exists()).toBe(true)
    expect(wrapper.findComponent(BaseVDataTable).exists()).toBe(false)
  })

  it.each([
    ['single', MockEFTLinksData.SINGLE_LINK_NO_OWING],
    ['multi', MockEFTLinksData.MULTI_LINK_NO_OWING]
  ])('%s link - no statements owing', async (description, linksResponseData) => {
    linksResponse = { ...linksResponseData }
    await initializeProps(wrapper)
    await waitForLoading(wrapper)

    validateExpectedTableStructure(wrapper)
    validateTableData(wrapper)

    expect(wrapper.find('[data-test="insufficient-funds-icon"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="insufficient-funds-message"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="multiple-statements-toggle-icon"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="multiple-statements-toggle-link"]').exists()).toBe(false)
  })

  it.each([
    ['nsf', MockEFTLinksData.SINGLE_LINK_SINGLE_OWING, MockEFTLinksData.DEFAULT_SUMMARY, true],
    ['no-nsf', MockEFTLinksData.SINGLE_LINK_SINGLE_OWING, getSummaryCreditsRemaining(100), false]
  ])('single-link - statements-owing-%s', async (description, linksResponseData, summaryResponseData, isInsufficient) => {
    linksResponse = { ...linksResponseData }
    summariesResponse = { ...summaryResponseData }
    await initializeProps(wrapper)
    await waitForLoading(wrapper)

    validateExpectedTableStructure(wrapper)
    validateTableData(wrapper)

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="multiple-statements-toggle-icon"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="multiple-statements-toggle-link]').exists()).toBe(false)
    expect(wrapper.find('[data-test="insufficient-funds-icon"]').exists()).toBe(isInsufficient)
  })

  it.each([
    ['nsf', MockEFTLinksData.SINGLE_LINK_MULTI_OWING, MockEFTLinksData.DEFAULT_SUMMARY, true],
    ['no-nsf', MockEFTLinksData.SINGLE_LINK_MULTI_OWING, getSummaryCreditsRemaining(100), false]
  ])('single-link - multiple statements-owing-%s', async (description, linksResponseData, summaryResponseData, isInsufficient) => {
    linksResponse = { ...MockEFTLinksData.SINGLE_LINK_MULTI_OWING }
    summariesResponse = { ...summaryResponseData }
    // Change the prop value
    await initializeProps(wrapper)
    await waitForLoading(wrapper)

    validateExpectedTableStructure(wrapper)
    validateTableData(wrapper)

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="multiple-statements-toggle-icon"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="multiple-statements-toggle-link"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="insufficient-funds-icon"]').exists()).toBe(isInsufficient)

    const spyToggleStatementView = vi.spyOn(wrapper.vm, 'toggleStatementsView')
    await wrapper.find('.statement-view-link').trigger('click')
    expect(spyToggleStatementView).toBeCalledTimes(1)
    expect(spyToggleStatementView).toBeCalledWith(wrapper.vm.results[0])
  })

  it('button state test - single owing', async () => {
    linksResponse = { ...MockEFTLinksData.SINGLE_OWING_BUTTON_STATE_TEST }
    // Change the prop value
    await initializeProps(wrapper)
    await waitForLoading(wrapper)

    const itemRows = wrapper.findComponent(BaseVDataTable).findAll(itemRow)
    validateAction(itemRows.at(0), PaymentActions.UNLINK_ACCOUNT)
    validateAction(itemRows.at(1), PaymentActions.CANCEL_PAYMENT)
    validateAction(itemRows.at(2), PaymentActions.APPLY_PAYMENT)
  })

  it('button state test - multi owing', async () => {
    linksResponse = { ...MockEFTLinksData.MULTI_OWING_BUTTON_STATE_TEST }
    // Change the prop value
    await initializeProps(wrapper)
    // Force expand all link rows to show statement break down
    wrapper.vm.expandedStatements = ['1', '2', '3']
    await wrapper.vm.processStatements()
    wrapper.vm.$forceUpdate()
    await waitForLoading(wrapper)

    const itemRows = wrapper.findComponent(BaseVDataTable).findAll(itemRow)
    validateAction(itemRows.at(0), PaymentActions.APPLY_ALL_PAYMENTS)
    validateAction(itemRows.at(1), PaymentActions.APPLY_PAYMENT)
    validateAction(itemRows.at(2), PaymentActions.APPLY_PAYMENT)
    validateAction(itemRows.at(3), '')
    validateAction(itemRows.at(4), PaymentActions.APPLY_PAYMENT)
    validateAction(itemRows.at(5), PaymentActions.CANCEL_PAYMENT)
    validateAction(itemRows.at(6), '')
    validateAction(itemRows.at(7), PaymentActions.CANCEL_PAYMENT)
    validateAction(itemRows.at(8), PaymentActions.CANCEL_PAYMENT)
  })

  function validateAction(itemRow, actionText) {
    expect(itemRow.findAll(itemCell).at(4).text()).toBe(actionText)
  }

  async function initializeProps(wrapper: any, creditsRemaining = 0) {
    await wrapper.setProps({ shortNameDetails: { id: 1, shortName: 'SHORTNAME' } })
    await wrapper.vm.$nextTick()
  }

  // Helper functions to validate link data
  function validateExpectedTableStructure(wrapper: any) {
    expect(wrapper.findComponent(BaseVDataTable).exists()).toBe(true)
    expect(wrapper.findComponent(BaseVDataTable).find(header).exists()).toBe(true)
    expect(wrapper.find('#eft-account-linking-table').exists()).toBe(true)
    expect(wrapper.find('.v-data-table__wrapper').exists()).toBe(true)

    const titles = wrapper.findComponent(BaseVDataTable).findAll(headerTitles)
    expect(titles.length).toBe(headers.length)

    for (let i = 0; i < headers.length; i++) {
      expect(titles.at(i).text()).toBe(headers[i])
    }
  }

  function validateTableData(wrapper: any, validateChildRows: boolean = false) {
    const itemRows = wrapper.findComponent(BaseVDataTable).findAll(itemRow)
    const totalStatementsOwing = linksResponse.items.reduce((count, item) => count + item.statementsOwing.length, 0)
    const expectedTotalRows = validateChildRows ? totalStatementsOwing : linksResponse.items.length

    expect(itemRows.length).toBe(expectedTotalRows)
    for (let i = 0; i < linksResponse.items.length; i++) {
      const columns = itemRows.at(i).findAll(itemCell)
      const link = linksResponse.items[i]
      expect(columns.at(0).text()).toContain(link.accountId)
      expect(columns.at(0).text()).toContain(link.accountName)
      expect(columns.at(1).text()).toBe(link.accountBranch)
      if (link.statementsOwing.length > 0) {
        expect(columns.at(2).text()).contains(link.statementsOwing[0].statementId)
      } else {
        expect(columns.at(2).text()).toBe('')
      }
      expect(columns.at(3).text()).toBe(
        CommonUtils.formatAmount(link.amountOwing))
    }
  }

  function getSummaryCreditsRemaining(creditsRemaining: number) {
    return {
      items: [
        {
          ...MockEFTLinksData.DEFAULT_SUMMARY.items[0],
          creditsRemaining: creditsRemaining
        }
      ]
    }
  }
})
