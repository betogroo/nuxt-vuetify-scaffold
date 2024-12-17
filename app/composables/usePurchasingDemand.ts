import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'
import {
  purchasingDemandsInsertSchema,
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

  return {
    purchasingPending,
    insertPurchasingDemand,
    purchasingFetchPending,
    fetchPurchasingDemands,
    purchasingDemands,
  }
}

export default usePurchasingDemand
