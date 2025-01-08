import { z } from 'zod'
import { purchasingDemandsRowSchema } from '~/schemas'

export const purchasingDemandsUpdateSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional().nullable(),
  contracting_agent_id: z.string().uuid().optional(),
  description: z.string().optional(),
  ptres_number: purchasingDemandsRowSchema.shape.ptres_number.optional(),
})
