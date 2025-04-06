import type { z } from 'zod'
import type {
  electionRowSchema,
  electionInsertSchema,
  ballotBoxRowSchema,
} from '~/schemas'

export type ElectionRow = z.infer<typeof electionRowSchema>
export type ElectionInsert = z.infer<typeof electionInsertSchema>

export type BallotBoxRow = z.infer<typeof ballotBoxRowSchema>
