import { productRowsSchema } from '~/schemas'
import type { ProductRow } from '~/types'
const useProduct = () => {
  const {
    data: products,
    fetch: fetchProducts,
    fetchPending: fetchPendingProducts,
  } = useGenericFetch<ProductRow>('products', productRowsSchema)
  return { products, fetchProducts, fetchPendingProducts }
}

export default useProduct
