import { toTypedSchema } from '@vee-validate/zod'
import { productNameSearch } from '~/schemas'

export const validateProductName = toTypedSchema(productNameSearch)
