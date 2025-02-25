import { packagingUnitRowSchema, packagingUnitRowsSchema } from '~/schemas'
import type { PackagingUnitRow } from '~/types'

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

  return {
    packagingUnits,
    packagingUnit,
    packagingUnitPending,
    fetchPackagingUnitsPending,
    fetchPackagingUnits,
    getPackagingUnitById,
  }
}

export default usePackagingUnit
