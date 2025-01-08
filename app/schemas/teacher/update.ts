import { z } from 'zod'

export const teacherUpdateSchema = z.object({
  id: uuidSchema.optional(),
  created_at: z.string().optional(),
  name: nameSchema.optional(),
})
