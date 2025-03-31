import type { z } from 'zod'
import type { electionRowSchema } from '~/schemas/voting'

export type Election = z.infer<typeof electionRowSchema>
