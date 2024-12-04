
export interface PADInfo {
  bankAccountNumber: string;
  bankInstitutionNumber: string;
  bankTransitNumber: string;
  isTOSAccepted?: boolean;
  isAcknowledged?: boolean;
}

export interface PADInfoValidation {
  accountNumber?: string;
  bankName?: string;
  bankNumber?: string;
  branchNumber?: string;
  isValid?: boolean;
  message?: string []
  statusCode: number
  transitAddress?: string
}

export interface Organization {
  id?: number;
}
