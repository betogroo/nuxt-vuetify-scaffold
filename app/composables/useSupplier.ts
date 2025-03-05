import type { SupplierInsert, SupplierRow } from '~/types'
import { supplierInsertSchema, supplierRowsSchema } from '~/schemas'
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

  return {
    insertSupplier,
    insertSupplierPending,
    suppliers,
    fetchSuppliers,
    fetchSuppliersPending,
  }
}

export default useSupplier
