import { offerInsertSchema, offersOnProductDemandSchema } from '~/schemas'
import type {
  OfferOnProductDemandRow,
  Database,
  OfferInsert,
  OfferRow,
  TableColumn,
} from '~/types'

const useOffer = () => {
  const { setPendingState } = useHelpers()
  const bestPurchasingDemandOffers = ref<OfferOnProductDemandRow[]>([])
  const supabase = useSupabaseClient<Database>()
  const {
    insert: insertOfferOnProductDemand,
    insertPending: isOfferInserting,
  } = useGenericInsert<OfferInsert, OfferRow>('offers', offerInsertSchema)

  const { data: offersOnProductDemand, fetch: fetchOffersOnProductDemand } =
    useGenericFetch<OfferOnProductDemandRow>(
      'offers',
      offersOnProductDemandSchema,
    )

  const fetchBestOfferOnPurchasingDemand = async (
    purchasing_demand_product_id: string,
  ): Promise<OfferOnProductDemandRow[] | null> => {
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
          const parsedData = offersOnProductDemandSchema.parse(newData)
          bestPurchasingDemandOffers.value = parsedData
          return parsedData
        }
        return null
      },
      'fetch-product-demand',
      { delay: 2000 },
    )
  }

  const offersOnDemandHeaders: TableColumn[] = [
    {
      key: 'supplier_name',
      title: 'Fornecedor',
    },
    {
      key: 'offer_value',
      title: 'Valor ofertado',
    },
  ]

  return {
    insertOfferOnProductDemand,
    isOfferInserting,
    fetchBestOfferOnPurchasingDemand,
    bestPurchasingDemandOffers,
    offersOnProductDemand,
    fetchOffersOnProductDemand,
    offersOnDemandHeaders,
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
