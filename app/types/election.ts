import type { z } from 'zod'
import type { electionRowSchema } from '~/schemas/election'

export type Election = z.infer<typeof electionRowSchema>
