import { offerRowSchema } from './row'

export const offerInsertSchema = offerRowSchema.omit({
  id: true,
  created_at: true,
})
