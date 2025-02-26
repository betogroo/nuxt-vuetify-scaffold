import { toTypedSchema } from '@vee-validate/zod'
import { packagingUnitRowSchema, packagingUnitInsertSchema } from '~/schemas'

export const validatePackagingUnitRow = toTypedSchema(packagingUnitRowSchema)
export const validatePackagingUnitInsert = toTypedSchema(
  packagingUnitInsertSchema,
)
