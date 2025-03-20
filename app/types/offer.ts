import type { z } from 'zod'
import type {
  offerRowSchema,
  offerInsertSchema,
  offerUpdateSchema,
  offerOnProductDemandSchema,
} from '~/schemas'

export type OfferRow = z.infer<typeof offerRowSchema>
export type OfferOnProductDemandRow = z.infer<typeof offerOnProductDemandSchema>

export type OfferInsert = z.infer<typeof offerInsertSchema>
export type OfferUpdate = z.infer<typeof offerUpdateSchema>
