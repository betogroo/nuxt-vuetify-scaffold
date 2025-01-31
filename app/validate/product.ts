import { toTypedSchema } from '@vee-validate/zod'
import { productNameSearch, productInsertSchema } from '~/schemas'

export const validateProduct = toTypedSchema(productInsertSchema)
export const validateProductName = toTypedSchema(productNameSearch)
