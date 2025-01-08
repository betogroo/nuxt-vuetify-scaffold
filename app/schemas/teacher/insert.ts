import { z } from 'zod'

export const teacherInsertSchema = z.object({
  id: uuidSchema.optional(),
  created_at: z.string().optional(),
  name: nameSchema,
})
