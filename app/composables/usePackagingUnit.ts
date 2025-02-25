import { packagingUnitRowsSchema } from '~/schemas'
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

  return { packagingUnits, fetchPackagingUnits, fetchPackagingUnitsPending }
}

export default usePackagingUnit
