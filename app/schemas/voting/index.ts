import { z } from 'zod'

export const electionRowSchema = z.object({
  id: z.number(),
  name: z.string(),
  date: z.string(),
})
