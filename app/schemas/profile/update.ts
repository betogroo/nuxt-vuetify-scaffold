import { z } from 'zod'

export const profileUpdateSchema = z.object({
  id: uuidSchema.optional(),
  name: nameSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
  username: usernameSchema.optional(),
  email: z.string().email().optional(),
})
