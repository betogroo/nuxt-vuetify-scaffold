import { z } from 'zod'

export const teacherRowSchema = z.object({
  id: uuidSchema,
  created_at: z.string(),
  name: nameSchema,
})
export const teacherRowsSchema = z.array(teacherRowSchema)
