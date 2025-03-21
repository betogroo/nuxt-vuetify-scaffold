import { toTypedSchema } from '@vee-validate/zod'
import { offerInsertSchema } from '~/schemas'

export const validateOfferInsert = toTypedSchema(offerInsertSchema)
