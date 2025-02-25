import { toTypedSchema } from '@vee-validate/zod'
import { packagingUnitRowSchema } from '~/schemas'

export const validatePackagingUnitRow = toTypedSchema(packagingUnitRowSchema)
