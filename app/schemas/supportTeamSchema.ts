import { z } from 'zod'

export const supportTeamRowSchema = z.object({
  id: uuidSchema,
  username: z.string(),
  name: z.string(),
  updated_at: z.string(),
})
