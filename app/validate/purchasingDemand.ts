import { toTypedSchema } from '@vee-validate/zod'
import {
  purchasingDemandsInsertSchema,
  purchasingDemandsUpdateSchema,
  supportTeamInsertSchema,
} from '~/schemas'

export const validatePurchasingDemand = toTypedSchema(
  purchasingDemandsInsertSchema,
)
export const validatePurchasingDemandUpdate = toTypedSchema(
  purchasingDemandsUpdateSchema,
)
export const validateSupportTeam = toTypedSchema(supportTeamInsertSchema)
