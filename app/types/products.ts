import type { z } from 'zod'

import type {
  productRowSchema,
  productRowsSchema,
  productInsertSchema,
  productUpdateSchema,
  productNameSearch,
  productOnDemandRowSchema,
  productClassRowSchema,
  productExpenseCategoryRowSchema,
  productUnitRowSchema,
  productUnitInsertSchema,
  unitRowSchema,
  productClassUpdateSchema,
  productClassInsertSchema,
} from '~/schemas'

export type ProductRow = z.infer<typeof productRowSchema>
export type ProductRows = z.infer<typeof productRowsSchema>
export type ProductOnDemandRow = z.infer<typeof productOnDemandRowSchema>

export type ProductClassRow = z.infer<typeof productClassRowSchema>
export type ProductClassInsert = z.infer<typeof productClassInsertSchema>
export type ProductClassUpdate = z.infer<typeof productClassUpdateSchema>

export type ProductExpenseCategoryRow = z.infer<
  typeof productExpenseCategoryRowSchema
>
export type ProductUnitRow = z.infer<typeof productUnitRowSchema>
export type ProductUnitInsert = z.infer<typeof productUnitInsertSchema>

export type UnitRow = z.infer<typeof unitRowSchema>

export type ProductName = z.infer<typeof productNameSearch>

export type ProductInsert = z.infer<typeof productInsertSchema>
export type ProductUpdate = z.infer<typeof productUpdateSchema>
