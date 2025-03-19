import { offerInsertSchema } from '~/schemas'
import type { OfferInsert, OfferRow } from '~/types'
const useOffer = () => {
  const {
    insert: insertOfferOnProductDemand,
    insertPending: isOfferInserting,
  } = useGenericInsert<OfferInsert, OfferRow>('offers', offerInsertSchema)

  return { insertOfferOnProductDemand, isOfferInserting }
}

export default useOffer
