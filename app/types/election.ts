import type { z } from 'zod'
import type {
  electionRowSchema,
  electionInsertSchema,
  ballotBoxRowSchema,
  ballotBoxInsertSchema,
} from '~/schemas'
import type { electionUpdateSchema } from '~/schemas/election/update'

export type ElectionRow = z.infer<typeof electionRowSchema>
export type ElectionInsert = z.infer<typeof electionInsertSchema>
export type ElectionUpdate = z.infer<typeof electionUpdateSchema>

export type BallotBoxRow = z.infer<typeof ballotBoxRowSchema>
export type BallotBoxInsert = z.infer<typeof ballotBoxInsertSchema>
