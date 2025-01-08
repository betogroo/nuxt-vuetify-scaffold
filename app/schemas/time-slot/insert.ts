import { z } from 'zod'

export const timeSlotsInsertSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  is_break: z.boolean().optional(),
})
