import {
  productClassRowSchema,
  productClassRowsSchema,
  productClassUpdateSchema,
} from '~/schemas'
import type { ProductClassRow, ProductClassUpdate } from '~/types'

const useProductClasses = () => {
  const { data: productClasses, fetch: fetchProductClasses } =
    useGenericFetch<ProductClassRow>('product_classes', productClassRowsSchema)

  const { getById: getProductClass, data: productClass } =
    useGenericGet<ProductClassRow>('product_classes', productClassRowSchema)

  const {
    update: updateProductClass,
    updatePending: updateProductClassPending,
  } = useGenericUpdate<ProductClassUpdate>(
    'product_classes',
    productClassUpdateSchema,
  )

  return {
    productClass,
    productClasses,
    updateProductClassPending,
    fetchProductClasses,
    getProductClass,
    updateProductClass,
  }
}

export default useProductClasses
