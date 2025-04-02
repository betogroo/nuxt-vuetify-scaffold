import type { z } from 'zod'
import type { electionRowSchema } from '~/schemas/election'

export type ElectionRow = z.infer<typeof electionRowSchema>
