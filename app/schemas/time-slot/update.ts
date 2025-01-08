import { z } from 'zod'

export const timeSlotsUpdateSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  created_at: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  is_break: z.boolean().optional(),
})
