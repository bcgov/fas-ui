import ConfigHelper from '@/util/config-helper'
import { DataOptions } from 'vuetify'
import { SessionStorageKeys } from '@/util/constants'

export const DEFAULT_ITEMS_PER_PAGE = 5
export const PAGINATION_COUNTER_STEP = 4

export const DEFAULT_DATA_OPTIONS: DataOptions = {
  page: 1,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  sortBy: [],
  sortDesc: [],
  groupBy: [],
  groupDesc: [],
  multiSort: false,
  mustSort: false
}
