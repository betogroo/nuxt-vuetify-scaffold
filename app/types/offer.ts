import type { z } from 'zod'
import type {
  offerRowSchema,
  offerInsertSchema,
  offerUpdateSchema,
  offerOnPurchasingDemandSchema,
} from '~/schemas'

export type OfferRow = z.infer<typeof offerRowSchema>
export type OfferOnPurchasingDemandRow = z.infer<
  typeof offerOnPurchasingDemandSchema
>

export type OfferInsert = z.infer<typeof offerInsertSchema>
export type OfferUpdate = z.infer<typeof offerUpdateSchema>
