import type { SupplierInsert, SupplierRow } from '~/types'
import { supplierInsertSchema } from '~/schemas'
const useSupplier = () => {
  const { insert: insertSupplier, insertPending: insertSupplierPending } =
    useGenericInsert<SupplierInsert, SupplierRow>(
      'suppliers',
      supplierInsertSchema,
    )

  return { insertSupplier, insertSupplierPending }
}

export default useSupplier
