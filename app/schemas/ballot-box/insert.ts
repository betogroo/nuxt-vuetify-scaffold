import { ballotBoxRowSchema } from '~/schemas'

export const ballotBoxInsertSchema = ballotBoxRowSchema.pick({
  name: true,
  election_id: true,
})
