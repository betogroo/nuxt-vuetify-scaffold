import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

export const ptresNumberSchema = z.union([
  z.literal('180205'),
  z.literal('180211'),
])

export const purchasingDemandsRowSchema = z.object({
  id: z.number(),
  contracting_agent_id: z.string().uuid(),
  created_at: z.string(),
  ptres_number: ptresNumberSchema,
  description: z.string(),
})

export const purchasingDemandsInsertSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  contracting_agent_id: z.string().uuid(),
  ptres_number: ptresNumberSchema,
  description: z.string(),
})

export const purchasingDemandsUpdateSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  contracting_agent_id: z.string().uuid().optional(),
  description: z.string().optional(),
  ptres_number: ptresNumberSchema.optional(),
})

export const validatePurchasingDemand = toTypedSchema(
  purchasingDemandsInsertSchema,
)
