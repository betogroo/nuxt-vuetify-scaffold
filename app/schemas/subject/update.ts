import { z } from 'zod'

export const subjectUpdateSchema = z.object({
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: nameSchema.optional(),
})
