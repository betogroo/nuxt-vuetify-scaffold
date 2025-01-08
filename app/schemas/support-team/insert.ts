import { z } from 'zod'

export const supportTeamInsertSchema = z.object({
  process_id: z.number(),
  profile_id: z.string(),
})
