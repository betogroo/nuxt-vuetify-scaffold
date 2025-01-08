import { toTypedSchema } from '@vee-validate/zod'
import { profileUpdateSchema } from '~/schemas'

export const validateProfile = toTypedSchema(profileUpdateSchema)
