import { toTypedSchema } from '@vee-validate/zod'
import { ballotBoxInsertSchema, electionInsertSchema } from '~/schemas'

export const validateElectionInsertSchema = toTypedSchema(electionInsertSchema)

export const validateBallotBoxInsert = toTypedSchema(ballotBoxInsertSchema)
