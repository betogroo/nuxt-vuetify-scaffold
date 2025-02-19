import { toTypedSchema } from '@vee-validate/zod'
import {
  productNameSearch,
  productInsertSchema,
  productUnitInsertSchema,
  productClassUpdateSchema,
} from '~/schemas'

export const validateProduct = toTypedSchema(productInsertSchema)
export const validateProductName = toTypedSchema(productNameSearch)
export const validateProductUnitInsert = toTypedSchema(productUnitInsertSchema)

export const validateProductClassUpdate = toTypedSchema(
  productClassUpdateSchema,
)
