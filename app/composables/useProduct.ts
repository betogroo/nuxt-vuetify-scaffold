import { productRowsSchema } from '~/schemas'
import type { ProductRow, TableColumn } from '~/types'
const useProduct = () => {
  const {
    data: products,
    fetch: fetchProducts,
    fetchPending: fetchPendingProducts,
  } = useGenericFetch<ProductRow>('products', productRowsSchema)

  const {
    getWithFilters: getProductsByName,
    data: productsByName,
    getDataPending: productByNamePending,
  } = useGenericGet<ProductRow[]>('products', productRowsSchema)

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
    products,
    fetchProducts,
    tableColumns,
    fetchPendingProducts,
    getProductsByName,
    productByNamePending,
    productsByName,
  }
}

export default useProduct
