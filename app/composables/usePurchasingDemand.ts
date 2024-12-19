import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'
import {
  purchasingDemandsInsertSchema,
  purchasingDemandsRowSchema,
  purchasingDemandsRowsSchema,
} from '~/schemas'

const usePurchasingDemand = () => {
  const { insertPending: purchasingPending, insert: insertPurchasingDemand } =
    useGenericInsert<PurchasingDemandInsert, PurchasingDemand>(
      'purchasing_demands',
      purchasingDemandsInsertSchema,
    )

  const {
    fetchPending: purchasingFetchPending,
    fetch: fetchPurchasingDemands,
    data: purchasingDemands,
  } = useGenericFetch<PurchasingDemand>(
    'purchasing_demands',
    purchasingDemandsRowsSchema,
  )

  const { getById: getPurchasingDemandById, data: purchasingDemand } =
    useGenericGet<PurchasingDemand>(
      'purchasing_demands',
      purchasingDemandsRowSchema,
    )

  return {
    purchasingPending,
    insertPurchasingDemand,
    purchasingFetchPending,
    fetchPurchasingDemands,
    purchasingDemands,
    getPurchasingDemandById,
    purchasingDemand,
  }
}

export default usePurchasingDemand
