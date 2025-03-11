import {
  productClassInsertSchema,
  productClassRowSchema,
  productClassRowsSchema,
  productClassUpdateSchema,
} from '~/schemas'
import type {
  ProductClassInsert,
  ProductClassRow,
  ProductClassUpdate,
} from '~/types'

const useProductClasses = () => {
  const {
    data: productClasses,
    fetch: fetchProductClasses,
    fetchPending: isProductClassesPending,
  } = useGenericFetch<ProductClassRow>(
    'product_classes',
    productClassRowsSchema,
  )

  const { getById: getProductClass, data: productClass } =
    useGenericGet<ProductClassRow>('product_classes', productClassRowSchema)

  const {
    insert: insertedProductClass,
    insertPending: insertProductClassPending,
  } = useGenericInsert<ProductClassInsert, ProductClassRow>(
    'product_classes',
    productClassInsertSchema,
  )

  const {
    update: updateProductClass,
    updatePending: updateProductClassPending,
  } = useGenericUpdate<ProductClassUpdate>(
    'product_classes',
    productClassUpdateSchema,
  )

  const { deleteDataById: deleteClassById, deletePending: isClassDeleting } =
    useGenericDelete<ProductClassRow>('product_classes')

  return {
    productClass,
    productClasses,
    updateProductClassPending,
    fetchProductClasses,
    getProductClass,
    updateProductClass,
    insertedProductClass,
    insertProductClassPending,
    isProductClassesPending,
    deleteClassById,
    isClassDeleting,
  }
}

export default useProductClasses
