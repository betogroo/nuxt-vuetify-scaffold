import { electionRowSchema } from '~/schemas'

export const electionInsertSchema = electionRowSchema.pick({
  name: true,
  date: true,
})
