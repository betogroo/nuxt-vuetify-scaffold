import { productExpenseCategoryRowsSchema } from '~/schemas'
import type { ProductExpenseCategoryRow } from '~/types'

const useProductExpenseCategories = () => {
  const {
    data: productExpenseCategories,
    fetch: fetchProductExpenseCategories,
  } = useGenericFetch<ProductExpenseCategoryRow>(
    'expense_category',
    productExpenseCategoryRowsSchema,
  )
  return { productExpenseCategories, fetchProductExpenseCategories }
}

export default useProductExpenseCategories
