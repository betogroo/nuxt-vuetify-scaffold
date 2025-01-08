import { toTypedSchema } from '@vee-validate/zod'
import { userLoginSchema, userSignupSchema } from '~/schemas'

export const validationLogin = toTypedSchema(userLoginSchema)
export const validationSignup = toTypedSchema(userSignupSchema)
