import { AddressSchemaIF } from '@/interfaces'
import { maxLength, required } from 'vuelidate/lib/validators'

// The Address schema containing Vuelidate rules.
export const addressSchema: AddressSchemaIF = {
  streetAddress: {
    required,
    max: maxLength(50)
  },
  streetAddressAdditional: {
    max: maxLength(50)
  },
  addressCity: {
    required,
    max: maxLength(40)
  },
  addressCountry: {
    required
  },
  addressRegion: {
    max: maxLength(2)
  },
  postalCode: {
    required,
    max: maxLength(15)
  },
  deliveryInstructions: {
    max: maxLength(80)
  }
}
