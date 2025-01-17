import { toTypedSchema } from '@vee-validate/zod'
import {
  purchasingDemandsInsertSchema,
  supportTeamInsertSchema,
} from '~/schemas'

export const validatePurchasingDemand = toTypedSchema(
  purchasingDemandsInsertSchema,
)
export const validateSupportTeam = toTypedSchema(supportTeamInsertSchema)
