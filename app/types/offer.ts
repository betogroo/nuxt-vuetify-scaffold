import type { z } from 'zod'
import type {
  offerRowSchema,
  offerInsertSchema,
  offerUpdateSchema,
} from '~/schemas'

export type OfferRow = z.infer<typeof offerRowSchema>
export type OfferInsert = z.infer<typeof offerInsertSchema>
export type OfferUpdate = z.infer<typeof offerUpdateSchema>
