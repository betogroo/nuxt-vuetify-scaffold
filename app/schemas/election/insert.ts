import { electionRowSchema } from '~/schemas'

export const electionInsertSchema = electionRowSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})
