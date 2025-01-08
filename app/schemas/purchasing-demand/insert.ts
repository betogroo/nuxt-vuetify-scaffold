import { z } from 'zod'
import { purchasingDemandsRowSchema } from '~/schemas'

export const purchasingDemandsInsertSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional().nullable(),
  description: z.string().min(1, MANDATORY_FIELD),
  ptres_number: purchasingDemandsRowSchema.shape.ptres_number,
  contracting_agent_id: z.string().uuid(),
})
