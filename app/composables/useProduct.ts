import type { TableColumn } from '~/types'

const useProduct = () => {
  const products = useProducts()
  const productOnDemand = useProductOnDemand()
  const productClasses = useProductClasses()
  const productExpenseCategories = useProductExpenseCategories()

  const tableColumns: TableColumn[] = [
    {
      key: 'cat_mat',
      title: 'Cat Mat',
    },
    {
      key: 'name',
      title: 'Descrição',
    },
    {
      key: 'product_class_id',
      title: 'Classe',
    },
    {
      key: 'expense_category_id',
      title: 'Natureza',
    },
  ]
  return {
    ...products,
    ...productOnDemand,
    ...productClasses,
    ...productExpenseCategories,
    tableColumns,
  }
}

export default useProduct
