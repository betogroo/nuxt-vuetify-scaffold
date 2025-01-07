import { z } from 'zod'

export const classInsertSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: nameSchema,
})
