export enum SessionStorageKeys {
  KeyCloakToken = 'KEYCLOAK_TOKEN',
  ApiConfigKey = 'AUTH_API_CONFIG',
  LaunchDarklyFlags = 'LD_FLAGS',
  ExtraProvincialUser = 'EXTRAPROVINCIAL_USER',
  SessionSynced = 'SESSION_SYNCED',
  AuthApiUrl = 'AUTH_API_URL',
  AuthWebUrl = 'AUTH_WEB_URL',
  StatusApiUrl = 'STATUS_API_URL'
}

export enum DateFilterCodes {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  LASTWEEK = 'LASTWEEK',
  LASTMONTH = 'LASTMONTH',
  CUSTOMRANGE = 'CUSTOMRANGE'
}

export enum PaymentMethods {
  CASH = 'CASH',
  CHEQUE = 'CHEQUE'
}

export enum SlipStatus {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
  BOUNCED='BOUNCED',
  NSF = 'NSF',
  REFUND ='REFUND',
  LAST_SERVICE='LAST_SERVICE'
}

export enum Role {
  FAS_USER = 'fas_user',
  FAS_EDIT = 'fas_edit',
  FAS_REPORTS = 'fas_reports',
  FAS_SEARCH = 'fas_search',
  FAS_VIEW = 'fas_view',
}
