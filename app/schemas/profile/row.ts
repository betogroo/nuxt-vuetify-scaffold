import { z } from 'zod'

export const profileRowSchema = z.object({
  id: uuidSchema,
  updated_at: z.string().nullable().optional(),
  name: nameSchema,
  username: usernameSchema.optional(),
  email: z.string().email().optional(),
})
export const profileRowsSchema = z.array(profileRowSchema)
