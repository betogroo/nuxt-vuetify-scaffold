import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'
import { purchasingDemandsInsertSchema } from '~/schemas'

const usePurchasingDemand = () => {
  const { insertPending: purchasingPending, insert: insertPurchasingDemand } =
    useGenericInsert<PurchasingDemandInsert, PurchasingDemand>(
      'purchasing_demands',
      purchasingDemandsInsertSchema,
    )
  return { purchasingPending, insertPurchasingDemand }
}

export default usePurchasingDemand
