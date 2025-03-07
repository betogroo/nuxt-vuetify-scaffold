import {
  packagingUnitInsertSchema,
  packagingUnitRowSchema,
  packagingUnitRowsSchema,
  packagingUnitUpdateSchema,
} from '~/schemas'
import type {
  PackagingUnitInsert,
  PackagingUnitRow,
  PackagingUnitUpdate,
} from '~/types'

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
    update: updatePackagingUnit,
    updatePending: updatePackagingUnitPending,
  } = useGenericUpdate<PackagingUnitUpdate>(
    'packaging_unit',
    packagingUnitUpdateSchema,
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

  const { deleteDataById: deleteUnitById, deletePending: isDeletingUnit } =
    useGenericDelete('packaging_unit')

  return {
    packagingUnits,
    packagingUnit,
    packagingUnitPending,
    fetchPackagingUnitsPending,
    fetchPackagingUnits,
    getPackagingUnitById,
    insertedPackagingUnit,
    insertedPackagingUnitPending,
    updatePackagingUnit,
    updatePackagingUnitPending,
    deleteUnitById,
    isDeletingUnit,
  }
}

export default usePackagingUnit
