import { toTypedSchema } from '@vee-validate/zod'
import {
  packagingUnitRowSchema,
  packagingUnitInsertSchema,
  packagingUnitUpdateSchema,
} from '~/schemas'

export const validatePackagingUnitRow = toTypedSchema(packagingUnitRowSchema)
export const validatePackagingUnitInsert = toTypedSchema(
  packagingUnitInsertSchema,
)
export const validatePackagingUnitUpdate = toTypedSchema(
  packagingUnitUpdateSchema,
)
