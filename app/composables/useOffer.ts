import { offerInsertSchema, offersOnPurchasingDemandSchema } from '~/schemas'
import type {
  OfferOnPurchasingDemandRow,
  Database,
  OfferInsert,
  OfferRow,
} from '~/types'

const useOffer = () => {
  const { setPendingState } = useHelpers()
  const purchasingDemandOffers = ref<OfferOnPurchasingDemandRow[]>([])
  const supabase = useSupabaseClient<Database>()
  const {
    insert: insertOfferOnProductDemand,
    insertPending: isOfferInserting,
  } = useGenericInsert<OfferInsert, OfferRow>('offers', offerInsertSchema)

  const fetchOfferOnPurchasingDemand = async (
    purchasing_demand_product_id: string,
  ): Promise<OfferOnPurchasingDemandRow[] | null> => {
    return await setPendingState(
      async () => {
        const { data: newData, error } = await supabase.rpc(
          'fetch_offers_on_purchasing_demand',
          {
            purchasing_demand_product_id,
          },
        )
        if (error) throw error
        console.log(error, newData)
        if (newData) {
          const parsedData = offersOnPurchasingDemandSchema.parse(newData)
          purchasingDemandOffers.value = parsedData
          return parsedData
        }
        return null
      },
      'fetch-product-demand',
      { delay: 2000 },
    )
  }

  return {
    insertOfferOnProductDemand,
    isOfferInserting,
    fetchOfferOnPurchasingDemand,
    purchasingDemandOffers,
  }
}

export default useOffer

/* const getProductsOnDemand = async (purchasing_demand_id: number) => {
    await setPendingState(
      async () => {
        const { data: newData, error } = await supabase.rpc(
          'fetch_products_demand',
          {
            purchasing_demand_id,
          },
        )
        if (error) throw error
        console.log(error, newData)
        if (newData) {
          const parsedData = productOnDemandRowsSchema.parse(newData)
          productsOnDemand.value = parsedData
        }
      },
      'fetch-product-demand',
      { delay },
    )
  } */
