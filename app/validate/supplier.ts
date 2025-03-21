import { toTypedSchema } from '@vee-validate/zod'
import { supplierInsertSchema } from '~/schemas'

export const validateSupplierInsert = toTypedSchema(supplierInsertSchema)
