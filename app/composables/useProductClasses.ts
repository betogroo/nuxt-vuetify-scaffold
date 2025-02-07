import { productClassRowsSchema } from '~/schemas'
import type { ProductClassRow } from '~/types'

const useProductClasses = () => {
  const { data: productClasses, fetch: fetchProductClasses } =
    useGenericFetch<ProductClassRow>('product_classes', productClassRowsSchema)
  return { productClasses, fetchProductClasses }
}

export default useProductClasses
