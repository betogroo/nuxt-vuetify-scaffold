import { toTypedSchema } from '@vee-validate/zod'
import { purchasingDemandsInsertSchema } from '~/schemas'

export const validatePurchasingDemand = toTypedSchema(
  purchasingDemandsInsertSchema,
)
