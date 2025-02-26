import {
  packagingUnitInsertSchema,
  packagingUnitRowSchema,
  packagingUnitRowsSchema,
} from '~/schemas'
import type { PackagingUnitInsert, PackagingUnitRow } from '~/types'

const usePackagingUnit = () => {
  const {
    data: packagingUnits,
    fetch: fetchPackagingUnits,
    fetchPending: fetchPackagingUnitsPending,
  } = useGenericFetch<PackagingUnitRow>(
    'packaging_unit',
    packagingUnitRowsSchema,
  )

  const {
    data: packagingUnit,
    getById: getPackagingUnitById,
    getDataPending: packagingUnitPending,
  } = useGenericGet<PackagingUnitRow>('packaging_unit', packagingUnitRowSchema)

  const {
    insert: insertedPackagingUnit,
    insertPending: insertedPackagingUnitPending,
  } = useGenericInsert<PackagingUnitInsert, PackagingUnitRow>(
    'packaging_unit',
    packagingUnitInsertSchema,
  )

  return {
    packagingUnits,
    packagingUnit,
    packagingUnitPending,
    fetchPackagingUnitsPending,
    fetchPackagingUnits,
    getPackagingUnitById,
    insertedPackagingUnit,
    insertedPackagingUnitPending,
  }
}

export default usePackagingUnit
