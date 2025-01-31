import { productOnDemandRowsSchema } from '~/schemas'
import type { Database, ProductOnDemandRow } from '~/types'

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

  return { productsOnDemand, getProductsOnDemand }
}

export default useProductOnDemand

/* const fetchPurchasingDemandRows = async () => {
    await setPendingState(
      async () => {
        const { data: newData, error } = await supabase.rpc(
          'fetch_purchasing_demands',
        )
        if (error) throw error
        if (newData) {
          const parsedData = purchasingDemandDetailsRowsSchema.parse(newData)
          demands.value = parsedData
        }
      },
      'fetch-purchasing-demand-details',
      { delay: delay.value },
    )
  } */
