export enum SessionStorageKeys {
  KeyCloakToken = 'KEYCLOAK_TOKEN',
  ApiConfigKey = 'AUTH_API_CONFIG',
  LaunchDarklyFlags = 'LD_FLAGS',
  ExtraProvincialUser = 'EXTRAPROVINCIAL_USER',
  SessionSynced = 'SESSION_SYNCED',
  AuthApiUrl = 'AUTH_API_URL',
  AuthWebUrl = 'AUTH_WEB_URL',
  PayApiUrl = 'PAY_API_URL',
  StatusApiUrl = 'STATUS_API_URL',
  FasWebUrl = 'FAS_WEB_URL',
  SiteminderLogoutUrl = 'SITEMINDER_LOGOUT_URL'
}

export enum DateFilterCodes {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  LASTWEEK = 'LASTWEEK',
  LASTMONTH = 'LASTMONTH',
  CUSTOMRANGE = 'CUSTOMRANGE',
}

export enum PaymentMethods {
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
}

export enum SlipStatus {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
  BOUNCED = 'BOUNCED',
  NSF = 'NSF',
  REFUND = 'REFUND',
  LAST = 'LAST',
  HOLD = 'HOLD',
  LINKED = 'LINKED',
  REFUNDREQUEST = 'REFUND_REQUESTED',
  REFUNDAUTHORIZED = 'REFUND_AUTHORIZED',
  REFUNDCOMPLETED = 'REFUND_COMPLETED',
  REFUNDUPLOADED = 'REFUND_UPLOADED',
  REFUNDREJECTED = 'REFUND_REJECTED',
  CANCEL_REFUND_REQUEST = 'CANCEL_REFUND_REQUEST',
  CANCELWRITEOFFREQUEST='CANCEL_WRITE_OFF_REQUEST',
  WRITEOFFAUTHORIZED='WRITE_OFF_AUTHORIZED',
  WRITEOFFREQUESTED='WRITE_OFF_REQUESTED',
  WRITEOFFCOMPLETED='WRITE_OFF_COMPLETED',
  VOID='VOID',
  CORRECTION='CORRECTION'
}

export enum SlipStatusLabel {
  ACTIVE = 'Place routing slip to active',
  NSF = 'Place routing slip to NSF',
  HOLD = 'Place routing slip on hold',
  LINKED = 'LINKED',
  REFUND_REQUESTED = 'Refund request',
  WRITE_OFF_REQUESTED = 'Write off request',
  CANCEL_REFUND_REQUEST = 'Cancel refund request',
  REFUND_AUTHORIZED='Review refund request',
  WRITE_OFF_AUTHORIZED='Authorize Write off request',
  CANCEL_WRITE_OFF_REQUEST='Cancel Write off request',
  VOID='Void Routing Slip',
  // CORRECTION='Correct Routing Slip' - Future
}

export enum Role {
  FAS_USER = 'fas_user',
  FAS_EDIT = 'fas_edit',
  FAS_REPORTS = 'fas_reports',
  FAS_SEARCH = 'fas_search',
  FAS_VIEW = 'fas_view',
  FAS_CREATE = 'fas_create',
  FAS_LNK = 'fas_link',
  FAS_TRANSACTION = 'fas_transaction',
  FAS_REFUND_APPROVER = 'fas_refund_approver',
  FAS_REFUND = 'fas_refund',
  FAS_VOID = 'fas_void',
  FAS_CORRECTION = 'fas_correction'
}

export enum InvoiceStatus {
  COMPLETED = 'COMPLETED',
  REFUNDED = 'REFUNDED',
  DELETE_ACCEPTED = 'DELETE_ACCEPTED',
  REFUNDREQUEST = 'REFUND_REQUESTED',
}

export enum ApiErrors {
  FAS_INVALID_ROUTING_SLIP_DIGITS = 'FAS_INVALID_ROUTING_SLIP_DIGITS'
}

export enum CreateRoutingSlipStatus {
  VALID = 'VALID',
  EXISTS = 'EXISTS',
  INVALID_DIGITS = 'INVALID_DIGITS',
}

export enum PatchActions {
  UPDATE_STATUS = 'updateStatus'
}

export const AXIOS_ERROR_ALERT_TIME_OUT = 5000

export const headerSearchTitle =
[
  {
    text: 'Routing Slip Number',
    align: 'start',
    value: 'routingSlipNumber',
    display: true,
    className: 'routing-slip'
  },
  {
    text: 'Receipt Number',
    align: 'start',
    sortable: false,
    value: 'receiptNumber',
    display: true,
    className: 'receiptNumber'
  },
  {
    text: 'Entity Number',
    align: 'start',
    value: 'accountName',
    sortable: false,
    display: false,
    className: 'accountName'
  },
  {
    text: 'Created By',
    align: 'start',
    value: 'createdName',
    sortable: false,
    display: false,
    className: 'createdName'
  },
  {
    text: 'Date',
    align: 'start',
    sortable: false,
    value: 'date',
    display: true,
    className: 'date'
  },
  {
    text: 'Status',
    align: 'start',
    sortable: false,
    value: 'status',
    display: true,
    className: 'status'
  },
  {
    text: 'Reference Number',
    align: 'start',
    value: 'businessIdentifier',
    sortable: false,
    display: true,
    className: 'businessIdentifier'
  },
  {
    text: 'Cheque Number',
    align: 'start',
    value: 'chequeReceiptNumber',
    sortable: false,
    display: false,
    className: 'cheque-receipt-number'
  },
  {
    text: 'Balance',
    align: 'right',
    value: 'remainingAmount',
    sortable: false,
    display: true,
    className: 'remainingAmount'
  },
  {
    text: 'Actions',
    align: 'start',
    value: '',
    sortable: false,
    display: true,
    hideInSearchColumnFilter: true,
    className: 'action'
  }
]
