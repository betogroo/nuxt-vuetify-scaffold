import {
  productRowsSchema,
  productInsertSchema,
  purchasingDemandProductsInsert,
  purchasingDemandProductsRows,
} from '~/schemas'
import type {
  ProductRow,
  ProductInsert,
  TableColumn,
  PurchasingDemandProductInsert,
  PurchasingDemandProduct,
} from '~/types'
const useProduct = () => {
  const {
    data: products,
    fetch: fetchProducts,
    fetchPending: fetchPendingProducts,
  } = useGenericFetch<ProductRow>('products', productRowsSchema)

  const { insert: insertProduct, insertPending: insertProductPending } =
    useGenericInsert<ProductInsert, ProductRow>('products', productInsertSchema)

  const { insert: insertProductsOnDemand } = useGenericInsert<
    PurchasingDemandProductInsert,
    PurchasingDemandProduct
  >('purchasing_demand_products', purchasingDemandProductsInsert)

  const { data: productOnDemand, getWithFilters: getProductsOnDemand } =
    useGenericGet<PurchasingDemandProduct[]>(
      'purchasing_demand_products',
      purchasingDemandProductsRows,
    )

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
    insertProductsOnDemand,
    productOnDemand,
    getProductsOnDemand,
    insertProduct,
    insertProductPending,
  }
}

export default useProduct
