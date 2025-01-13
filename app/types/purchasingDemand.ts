import type { z } from 'zod'

import type {
  purchasingDemandsInsertSchema,
  purchasingDemandsRowSchema,
  purchasingDemandDetailsRowSchema,
  purchasingDemandsUpdateSchema,
  ptresNumberSchema,
  purchasingDemandsWithContractingAgentRowsSchema,
  purchasingDemandWithContractingAgentSchema,
  purchasingDemandDetailsSchema,
  purchasingDemandsWithMembersSchema,
} from '~/schemas'

export type Ptres = z.infer<typeof ptresNumberSchema>
export type PurchasingDemand = z.infer<typeof purchasingDemandsRowSchema>
export type PurchasingDemandDetails = z.infer<
  typeof purchasingDemandDetailsRowSchema
>
export type PurchasingDemandInsert = z.infer<
  typeof purchasingDemandsInsertSchema
>
export type PurchasingDemandUpdate = z.infer<
  typeof purchasingDemandsUpdateSchema
>

export type DemandWithAgent = z.infer<
  typeof purchasingDemandWithContractingAgentSchema
>
export type DemandsWithAgent = z.infer<
  typeof purchasingDemandsWithContractingAgentRowsSchema
>

export type DemandDetails = z.infer<typeof purchasingDemandDetailsSchema>

export type AgentWithDemands = z.infer<
  typeof purchasingDemandsWithMembersSchema
>
