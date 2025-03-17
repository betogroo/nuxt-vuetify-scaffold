import {
  productOnDemandRowsSchema,
  purchasingDemandProductsInsert,
} from '~/schemas'
import type {
  Database,
  ProductOnDemandRow,
  PurchasingDemandProduct,
  PurchasingDemandProductInsert,
} from '~/types'

const delay = 2000
const useProductOnDemand = () => {
  const productsOnDemand = ref<ProductOnDemandRow[]>([])

  const supabase = useSupabaseClient<Database>()
  const { setPendingState } = useHelpers()

  const getProductsOnDemand = async (purchasing_demand_id: number) => {
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
  }

  const { insert: insertProductsOnDemand } = useGenericInsert<
    PurchasingDemandProductInsert,
    PurchasingDemandProduct
  >('purchasing_demand_products', purchasingDemandProductsInsert)

  /*  const { data: productOnDemand, getWithFilters: getProductsOnDemand } =
      useGenericGet<PurchasingDemandProduct[]>(
        'purchasing_demand_products',
        purchasingDemandProductsRows,
      ) */

  supabase
    .channel('custom-insert-channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'purchasing_demand_products',
      },
      (payload) => {
        console.log('Change received!', payload)
        if (payload.new.purchasing_demand_id)
          getProductsOnDemand(payload.new.purchasing_demand_id)
      },
    )
    .subscribe()

  return { productsOnDemand, getProductsOnDemand, insertProductsOnDemand }
}

export default useProductOnDemand
