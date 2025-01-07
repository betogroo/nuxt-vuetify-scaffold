import { toTypedSchema } from '@vee-validate/zod'
import { classInsertSchema } from '~/schemas'

export const validateClass = toTypedSchema(classInsertSchema)
