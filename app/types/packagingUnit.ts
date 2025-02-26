import type { z } from 'zod'
import type {
  packagingUnitRowSchema,
  packagingUnitInsertSchema,
} from '~/schemas'

export type PackagingUnitRow = z.infer<typeof packagingUnitRowSchema>
export type PackagingUnitInsert = z.infer<typeof packagingUnitInsertSchema>
