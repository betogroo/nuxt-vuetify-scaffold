import type { z } from 'zod'
import type { electionRowSchema, electionInsertSchema } from '~/schemas'

export type ElectionRow = z.infer<typeof electionRowSchema>
export type ElectionInsert = z.infer<typeof electionInsertSchema>
