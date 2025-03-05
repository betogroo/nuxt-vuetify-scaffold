import type { SupplierInsert, SupplierRow } from '~/types'
import {
  supplierInsertSchema,
  supplierRowSchema,
  supplierRowsSchema,
} from '~/schemas'
const useSupplier = () => {
  const { insert: insertSupplier, insertPending: insertSupplierPending } =
    useGenericInsert<SupplierInsert, SupplierRow>(
      'suppliers',
      supplierInsertSchema,
    )

  const {
    data: suppliers,
    fetch: fetchSuppliers,
    fetchPending: fetchSuppliersPending,
  } = useGenericFetch<SupplierRow>('suppliers', supplierRowsSchema)

  const { data: supplier, getById: getSupplierById } =
    useGenericGet<SupplierRow>('suppliers', supplierRowSchema)

  return {
    supplier,
    suppliers,
    insertSupplierPending,
    fetchSuppliersPending,
    getSupplierById,
    fetchSuppliers,
    insertSupplier,
  }
}

export default useSupplier
