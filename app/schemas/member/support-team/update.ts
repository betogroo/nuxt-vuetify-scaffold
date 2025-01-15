import { z } from 'zod'

export const supportTeamUpdateSchema = z.object({
  process_id: z.number().optional(),
  profile_id: z.string().optional(),
})
