<template>
  <div class="base-address">
    <!-- Display fields -->
    <v-expand-transition>
      <div
        v-if="!editing"
        class="address-block"
      >
        <div class="address-block__info pre-wrap">
          <p class="address-block__info-row">
            {{ addressLocal.streetAddress }}
          </p>
          <p
            v-if="addressLocal.streetAddressAdditional"
            class="address-block__info-row"
          >
            {{ addressLocal.streetAddressAdditional }}
          </p>
          <p class="address-block__info-row">
            <span>{{ addressLocal.addressCity }}</span>
            <span v-if="addressLocal.addressRegion">&nbsp;{{ addressLocal.addressRegion }}&nbsp;</span>
            <span v-if="addressLocal.postalCode">&nbsp;{{ addressLocal.postalCode }}</span>
          </p>
          <p class="address-block__info-row">
            {{ getCountryName(country) }}
          </p>
          <p
            v-if="addressLocal.deliveryInstructions"
            class="address-block__info-row delivery-text"
          >
            {{ addressLocal.deliveryInstructions }}
          </p>
        </div>
      </div>
    </v-expand-transition>

    <!-- Edit fields -->
    <v-expand-transition>
      <v-form
        v-if="editing"
        ref="addressForm"
        name="address-form"
        lazy-validation
      >
        <div class="form__row">
          <v-autocomplete
            v-model="addressLocal.addressCountry"
            autocomplete="new-password"
            :name="Math.random().toString()"
            variant="filled"
            class="address-country"
            hide-no-data
            item-title="name"
            item-value="code"
            :items="getCountries()"
            :label="countryLabel"
            :rules="[...schemaLocal.country]"
          >
            <template #item="{item, props: autoCompleteProps}">
              <v-divider v-if="item.raw.divider" />
              <v-list-item
                v-else
                v-bind="autoCompleteProps"
              />
            </template>
          </v-autocomplete>
          <!-- special field to select AddressComplete country, separate from our model field -->
          <input
            :id="countryId"
            type="hidden"
            :value="country"
          >
        </div>
        <div class="form__row">
          <!-- NB1: AddressComplete needs to be enabled each time user clicks in this search field.
               NB2: Only process first keypress -- assumes if user moves between instances of this
                   component then they are using the mouse (and thus, clicking). -->
          <v-text-field
            :id="streetId"
            v-model="addressLocal.streetAddress"
            autocomplete="new-password"
            class="street-address"
            variant="filled"
            :hint="hideAddressHint ? '' : 'Street address, PO box, rural route, or general delivery address'"
            :label="streetLabel"
            :name="Math.random().toString()"
            persistent-hint
            :rules="[...schemaLocal.street]"
            @keypress.once="enableAddressComplete()"
            @click="enableAddressComplete()"
          />
        </div>
        <div class="form__row">
          <v-textarea
            v-model="addressLocal.streetAddressAdditional"
            autocomplete="new-password"
            auto-grow
            variant="filled"
            class="street-address-additional"
            :label="streetAdditionalLabel"
            :name="Math.random().toString()"
            rows="1"
            :rules="!!addressLocal.streetAddressAdditional ? [...schemaLocal.streetAdditional] : []"
          />
        </div>
        <div class="form__row three-column">
          <v-text-field
            v-model="addressLocal.addressCity"
            autocomplete="new-password"
            variant="filled"
            class="item address-city"
            :label="cityLabel"
            :name="Math.random().toString()"
            :rules="[...schemaLocal.city]"
          />
          <v-autocomplete
            v-if="useCountryRegions(country)"
            v-model="addressLocal.addressRegion"
            autocomplete="new-password"
            variant="filled"
            class="item address-region"
            hide-no-data
            item-title="name"
            item-value="short"
            :items="getCountryRegions(country)"
            :label="regionLabel"
            :menu-props="{ maxHeight: '14rem' }"
            :name="Math.random().toString()"
            :rules="[...schemaLocal.region]"
          >
            <template #item="{item, props: autoCompleteProps}">
              <v-divider v-if="item.raw.divider" />
              <v-list-item
                v-else
                v-bind="autoCompleteProps"
              />
            </template>
          </v-autocomplete>
          <v-text-field
            v-else
            v-model="addressLocal.addressRegion"
            variant="filled"
            class="item address-region"
            :label="regionLabel"
            :name="Math.random().toString()"
            :rules="[...schemaLocal.region]"
          />
          <v-text-field
            v-model="addressLocal.postalCode"
            variant="filled"
            class="item postal-code"
            :label="postalCodeLabel"
            :name="Math.random().toString()"
            :rules="[...schemaLocal.postalCode]"
          />
        </div>
        <div
          v-if="!hideDeliveryAddress"
          class="form__row"
        >
          <v-textarea
            v-model="addressLocal.deliveryInstructions"
            auto-grow
            variant="filled"
            class="delivery-instructions"
            :label="deliveryInstructionsLabel"
            :name="Math.random().toString()"
            rows="2"
            :rules="!!addressLocal.deliveryInstructions ? [...schemaLocal.deliveryInstructions] : []"
          />
        </div>
      </v-form>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
import { AddressIF, SchemaIF } from '@bcrs-shared-components/interfaces'
import { Ref, onMounted, toRef, watch } from 'vue'
import {
  baseRules,
  spaceRules,
  useAddress,
  useAddressComplete,
  useBaseValidations,
  useCountriesProvinces,
  useCountryRegions
} from '@bcrs-shared-components/base-address/factories'
import { AddressValidationRules } from '@bcrs-shared-components/enums'

const props = withDefaults(defineProps<{
  value: AddressIF
  editing: boolean
  schema: SchemaIF
  triggerErrors: boolean
  hideAddressHint: boolean
  hideDeliveryAddress: boolean
}>(), {
  value: () => ({
    streetAddress: '',
    streetAddressAdditional: '',
    addressCity: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: null,
    deliveryInstructions: ''
  }),
  /* used for readonly mode vs edit mode */
  editing: false,
  /* contains validation for each field */
  schema: null,
  /* triggers all current form validation errors */
  triggerErrors: false,
  /* Hides the persistent hint field on Address Input */
  hideAddressHint: false,
  /* Hides Delivery Address field (e.g. for Unit Notes) */
  hideDeliveryAddress: false
})

const emits = defineEmits<{
  'update-address': [address: AddressIF]
  valid: [valid: boolean]
}>()

// eslint-disable-next-line vue/no-setup-props-destructure
const localSchema = { ...props.schema }
const {
  addressLocal,
  country,
  schemaLocal,
  labels
} = useAddress(toRef(props.value) as Ref<AddressIF>, localSchema)

const origPostalCodeRules = localSchema.postalCode
const origRegionRules = localSchema.region

const { addressForm, resetValidation, validate } = useBaseValidations()

const { enableAddressComplete, uniqueIds } = useAddressComplete(addressLocal)

const countryProvincesHelpers = useCountriesProvinces()

const countryChangeHandler = (val: string, oldVal: string) => {
  // do not trigger any changes if it is view only (summary instance)
  if (!props.editing) return

  if (val === 'CA') {
    localSchema.postalCode = origPostalCodeRules.concat([baseRules.postalCode])
    localSchema.region = origRegionRules
  } else if (val === 'US') {
    localSchema.postalCode = origPostalCodeRules.concat([baseRules.zipCode])
    localSchema.region = origRegionRules
  } else {
    localSchema.postalCode = origPostalCodeRules.concat([baseRules[AddressValidationRules.MAX_LENGTH](15)])
    localSchema.region = [baseRules[AddressValidationRules.MAX_LENGTH](2), ...spaceRules]
  }
  // reset other address fields (check is for loading an existing address)
  if (oldVal) {
    addressLocal.value.streetAddress = ''
    addressLocal.value.streetAddressAdditional = ''
    addressLocal.value.addressCity = ''
    addressLocal.value.addressRegion = ''
    addressLocal.value.postalCode = ''
  }
  // wait for schema update and validate the form
  setTimeout(() => {
    props.triggerErrors ? validate() : resetValidation()
  }, 5)
}

onMounted(() => {
  countryChangeHandler(addressLocal.value.addressCountry, null)
})

watch(() => addressLocal.value, (val) => {
  let valid = true
  /** checks each field against the schema rules to see if the address is valid or not
   * NOTE: we don't want it to trigger error msgs yet which is why this does not call validate()
  */
  for (const key in val) {
    for (const index in schemaLocal.value[key]) {
      if (schemaLocal.value[key][index](val[key]) !== true) {
        valid = false
        break
      }
    }
    if (!valid) break
  }
  emits('valid', valid)
  emits('update-address', val)
}, { immediate: true, deep: true })

watch(() => country.value, (val, oldVal) => {
  countryChangeHandler(val, oldVal)
})

watch(() => props.triggerErrors, () => {
  validate()
})

const { getCountries, getCountryName, getCountryRegions } = countryProvincesHelpers
const {
  countryLabel,
  streetLabel,
  streetAdditionalLabel,
  cityLabel,
  regionLabel,
  postalCodeLabel,
  deliveryInstructionsLabel
} = labels
const { streetId, countryId } = uniqueIds

defineExpose({
  addressForm,
  validate
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.delivery-text {
  font-style: italic;
  margin-top: 10px;
}

// Address Block Layout
.address-block {
  display: flex;
  p {
    margin-bottom: unset;
  }
}

.address-block__info {
  flex: 1 1 auto;
}

// Form Row Elements
.form__row.three-column {
  align-items: stretch;
  display: flex;
  flex-flow: row nowrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;

  .item {
    flex: 1 1 auto;
    flex-basis: 0;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}

.pre-wrap {
  white-space: pre-wrap;
}

// make 'readonly' inputs looks disabled
// (can't use 'disabled' because we want normal error styling)
.v-select.v-input--is-readonly,
.v-text-field.v-input--is-readonly {
  pointer-events: none;

  :deep(.v-label) {
    // set label colour to same as disabled
    color: rgba(0,0,0,.38);
  }

  :deep(.v-select__selection) {
    // set selection colour to same as disabled
    color: rgba(0,0,0,.38);
  }

  :deep(.v-icon) {
    // set error icon colour to same as disabled
    color: rgba(0,0,0,.38) !important;
    opacity: 0.6;
  }
}
</style>
