import type { z } from 'zod'
import type {
  packagingUnitRowSchema,
  packagingUnitInsertSchema,
  packagingUnitUpdateSchema,
} from '~/schemas'

export type PackagingUnitRow = z.infer<typeof packagingUnitRowSchema>
export type PackagingUnitInsert = z.infer<typeof packagingUnitInsertSchema>
export type PackagingUnitUpdate = z.infer<typeof packagingUnitUpdateSchema>
