import { ballotBoxRowSchema } from '~/schemas'

export const ballotBoxInsertSchema = ballotBoxRowSchema.pick({
  name: true,
})
