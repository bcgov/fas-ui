import { b } from 'vitest/dist/reporters-5f784f42'

export const eftNoLinks = {
  items: []
}

export const eftSingleLinkNoOwing = {
  items: [
    {
      accountBranch: 'BRANCH_NAME',
      accountId: '123',
      accountName: 'ACCOUNT_NAME',
      amountOwing: 0,
      hasPendingPayment: false,
      id: 170,
      shortNameId: 164,
      statementId: 5471131,
      statementsOwing: []
    }
  ]
}

export const eftMultiLinkNoOwing = {
  items: [
    {
      accountBranch: 'BRANCH_NAME_1',
      accountId: '123',
      accountName: 'ACCOUNT_NAME_1',
      amountOwing: 0,
      hasPendingPayment: false,
      id: 170,
      shortNameId: 164,
      statementId: 1111,
      statementsOwing: []
    },
    {
      accountBranch: 'BRANCH_NAME_2',
      accountId: '124',
      accountName: 'ACCOUNT_NAME_2',
      amountOwing: 0,
      hasPendingPayment: false,
      id: 170,
      shortNameId: 164,
      statementId: 2222,
      statementsOwing: []
    }
  ]
}

export const eftSingleLinkSingleOwing = {
  items: [
    {
      accountBranch: 'BRANCH_NAME',
      accountId: '123',
      accountName: 'ACCOUNT_NAME',
      amountOwing: 31.5,
      hasPendingPayment: false,
      id: 170,
      shortNameId: 164,
      statementId: 5471131,
      statementsOwing: [
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 0,
          pendingPaymentsCount: 0,
          statementId: 5471131
        }
      ]
    }
  ]
}

export const eftSingleLinkMultiOwing = {
  items: [
    {
      accountBranch: 'BRANCH_NAME',
      accountId: '123',
      accountName: 'ACCOUNT_NAME',
      amountOwing: 31.5,
      hasPendingPayment: false,
      id: 170,
      shortNameId: 164,
      statementId: 5471131,
      statementsOwing: [
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 0,
          pendingPaymentsCount: 0,
          statementId: 1111
        },
        {
          amountOwing: 50.0,
          pendingPaymentsAmount: 0,
          pendingPaymentsCount: 0,
          statementId: 2222
        }
      ]
    }
  ]
}

export const eftSingleOwingButtonStateTest = {
  items: [
    {
      accountBranch: 'BRANCH_NAME_1',
      accountId: '1',
      accountName: 'ACCOUNT_NAME_1',
      amountOwing: 0,
      hasPendingPayment: false,
      id: 170,
      shortNameId: 164,
      statementId: 5471131,
      statementsOwing: []
    },
    {
      accountBranch: 'BRANCH_NAME_2',
      accountId: '2',
      accountName: 'ACCOUNT_NAME_2',
      amountOwing: 31.5,
      hasPendingPayment: true,
      id: 170,
      shortNameId: 164,
      statementId: 5471131,
      statementsOwing: [
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 31.5,
          pendingPaymentsCount: 1,
          statementId: 1111
        }
      ]
    },
    {
      accountBranch: 'BRANCH_NAME_3',
      accountId: '3',
      accountName: 'ACCOUNT_NAME_3',
      amountOwing: 31.5,
      hasPendingPayment: false,
      id: 170,
      shortNameId: 164,
      statementId: 5471131,
      statementsOwing: [
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 0,
          pendingPaymentsCount: 0,
          statementId: 1111
        }
      ]
    }
  ]
}

export const eftMultiOwingButtonStateTest = {
  items: [
    {
      accountBranch: 'BRANCH_NAME_1',
      accountId: '1',
      accountName: 'ACCOUNT_NAME_1',
      amountOwing: 63,
      hasPendingPayment: false,
      id: 170,
      shortNameId: 164,
      statementId: 5471131,
      statementsOwing: [
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 0,
          pendingPaymentsCount: 0,
          statementId: 1111
        },
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 0,
          pendingPaymentsCount: 0,
          statementId: 2222
        }
      ]
    },
    {
      accountBranch: 'BRANCH_NAME_2',
      accountId: '2',
      accountName: 'ACCOUNT_NAME_2',
      amountOwing: 31.5,
      hasPendingPayment: true,
      id: 170,
      shortNameId: 164,
      statementId: 5471131,
      statementsOwing: [
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 0,
          pendingPaymentsCount: 0,
          statementId: 1111
        },
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 31.5,
          pendingPaymentsCount: 1,
          statementId: 2222
        }
      ]
    },
    {
      accountBranch: 'BRANCH_NAME_3',
      accountId: '3',
      accountName: 'ACCOUNT_NAME_3',
      amountOwing: 63.0,
      hasPendingPayment: true,
      id: 170,
      shortNameId: 164,
      statementId: 5471131,
      statementsOwing: [
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 31.5,
          pendingPaymentsCount: 1,
          statementId: 1111
        },
        {
          amountOwing: 31.5,
          pendingPaymentsAmount: 31.5,
          pendingPaymentsCount: 1,
          statementId: 2222
        }
      ]
    }
  ]
}

export const defaultEFTSummariesResponse = {
  items: [
    {
      casSupplierNumber: '1234567',
      casSupplierSite: '11111',
      creditsRemaining: 0,
      email: 'test@email.com',
      id: 164,
      lastPaymentReceivedDate: '2024-08-07T07:00:00.000000+0000',
      linkedAccountsCount: 0,
      refundStatus: 'PENDING_APPROVAL',
      shortName: 'SHORTNAME',
      shortNameType: 'EFT'
    }
  ]
}

export const MockEFTLinksData = {
  DEFAULT_SUMMARY: defaultEFTSummariesResponse,
  NO_LINKS: eftNoLinks,
  SINGLE_LINK_NO_OWING: eftSingleLinkNoOwing,
  SINGLE_LINK_MULTI_OWING: eftSingleLinkMultiOwing,
  MULTI_LINK_NO_OWING: eftMultiLinkNoOwing,
  SINGLE_LINK_SINGLE_OWING: eftSingleLinkSingleOwing,
  SINGLE_OWING_BUTTON_STATE_TEST: eftSingleOwingButtonStateTest,
  MULTI_OWING_BUTTON_STATE_TEST: eftMultiOwingButtonStateTest
}
