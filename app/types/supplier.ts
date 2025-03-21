import type { z } from 'zod'
import type {
  supplierRowSchema,
  supplierInsertSchema,
  supplierUpdateSchema,
} from '~/schemas'

export type SupplierRow = z.infer<typeof supplierRowSchema>
export type SupplierInsert = z.infer<typeof supplierInsertSchema>
export type SupplierUpdate = z.infer<typeof supplierUpdateSchema>
