import { toTypedSchema } from '@vee-validate/zod'
import { addUserSchema } from '~/schemas'

export const validationUserSchema = toTypedSchema(addUserSchema)
