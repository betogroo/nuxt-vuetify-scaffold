import { z } from 'zod'

export const classRowSchema = z.object({
  created_at: z.string(),
  id: z.string(),
  name: nameSchema,
})
export const classRowsSchema = z.array(classRowSchema)
