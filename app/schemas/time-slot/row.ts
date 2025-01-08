import { z } from 'zod'

export const timeSlotsRowSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  is_break: z.boolean(),
})

export const timeSlotsRowsSchema = z.array(timeSlotsRowSchema)
