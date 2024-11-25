import { AddressSchemaIF } from '@/interfaces'
import { maxLength, required } from 'vuelidate/lib/validators'

// The Address schema containing Vuelidate rules.
export const addressSchema: AddressSchemaIF = {
  streetAddress: {
    max: maxLength(50)
  },
  streetAddressAdditional: {
    max: maxLength(50)
  },
  addressCity: {
    max: maxLength(40)
  },
  addressCountry: {
  },
  addressRegion: {
    max: maxLength(2)
  },
  postalCode: {
    max: maxLength(15)
  },
  deliveryInstructions: {
    max: maxLength(80)
  }
}
