import { z } from 'zod'

export const subjectInsertSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: nameSchema,
})
