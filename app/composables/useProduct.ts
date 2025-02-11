import { productRowSchema } from '~/schemas'
import type { ProductRow } from '~/types'
const useProduct = () => {
  const products = useProducts()
  const productOnDemand = useProductOnDemand()
  const productClasses = useProductClasses()
  const productExpenseCategories = useProductExpenseCategories()
  const productUnit = useProductUnit()

  const {
    data: product,
    getById: getProduct,
    getDataPending: productPending,
  } = useGenericGet<ProductRow>('products', productRowSchema)

  return {
    ...products,
    ...productOnDemand,
    ...productClasses,
    ...productExpenseCategories,
    ...productUnit,
    product,
    productPending,
    getProduct,
  }
}

export default useProduct
