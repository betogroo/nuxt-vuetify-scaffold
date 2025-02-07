import { productInsertSchema, productRowsSchema } from '~/schemas'
import type { ProductInsert, ProductRow } from '~/types'

const useProducts = () => {
  const {
    data: products,
    fetch: fetchProducts,
    fetchPending: fetchPendingProducts,
  } = useGenericFetch<ProductRow>('products', productRowsSchema)

  const { insert: insertProduct, insertPending: insertProductPending } =
    useGenericInsert<ProductInsert, ProductRow>('products', productInsertSchema)

  const {
    getWithFilters: getProductsByName,
    data: productsByName,
    getDataPending: productByNamePending,
  } = useGenericGet<ProductRow[]>('products', productRowsSchema)

  return {
    products,
    fetchProducts,
    fetchPendingProducts,
    insertProduct,
    insertProductPending,
    getProductsByName,
    productsByName,
    productByNamePending,
  }
}

export default useProducts
