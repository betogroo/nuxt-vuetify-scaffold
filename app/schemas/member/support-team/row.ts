import { z } from 'zod'

export const supportTeamRowSchema = z.object({
  process_id: z.number(),
  profile_id: z.string(),
})
