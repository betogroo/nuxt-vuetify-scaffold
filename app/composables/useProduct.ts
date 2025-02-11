import { productRowSchema } from '~/schemas'
import type { ProductRow } from '~/types'
const useProduct = () => {
  const products = useProducts()
  const productOnDemand = useProductOnDemand()
  const productClasses = useProductClasses()
  const productExpenseCategories = useProductExpenseCategories()

  const { data: product, getById: getProduct } = useGenericGet<ProductRow>(
    'products',
    productRowSchema,
  )

  return {
    ...products,
    ...productOnDemand,
    ...productClasses,
    ...productExpenseCategories,
    product,
    getProduct,
  }
}

export default useProduct
