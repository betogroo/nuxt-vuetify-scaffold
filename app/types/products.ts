import type { z } from 'zod'

import type {
  productRowSchema,
  productRowsSchema,
  productInsertSchema,
  productUpdateSchema,
  productNameSearch,
  productOnDemandRowSchema,
  productClassRowSchema,
} from '~/schemas'

export type ProductRow = z.infer<typeof productRowSchema>
export type ProductRows = z.infer<typeof productRowsSchema>
export type ProductOnDemandRow = z.infer<typeof productOnDemandRowSchema>
export type ProductClassRow = z.infer<typeof productClassRowSchema>

export type ProductName = z.infer<typeof productNameSearch>

export type ProductInsert = z.infer<typeof productInsertSchema>
export type ProductUpdate = z.infer<typeof productUpdateSchema>
