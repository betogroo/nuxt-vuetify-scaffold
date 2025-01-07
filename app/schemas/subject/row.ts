import { z } from 'zod'

export const subjectRowSchema = z.object({
  created_at: z.string(),
  id: z.string(),
  name: nameSchema,
})

export const subjectRowsSchema = z.array(subjectRowSchema)
