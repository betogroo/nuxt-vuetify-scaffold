import { packagingUnitRowSchema } from '~/schemas'

export const packagingUnitInsertSchema = packagingUnitRowSchema.omit({
  id: true,
  created_at: true,
})
