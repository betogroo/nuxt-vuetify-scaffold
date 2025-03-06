import type { SupplierInsert, SupplierRow } from '~/types'
import {
  supplierInsertSchema,
  supplierRowSchema,
  supplierRowsSchema,
} from '~/schemas'
const useSupplier = () => {
  const supabase = useSupabaseClient()
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

  const channel = supabase.channel('custom-update-channel')

  channel
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'suppliers' },
      (payload) => {
        console.log('INSERT received', payload)
        try {
          const newSupplier = supplierRowSchema.parse(payload.new) // Valida e tipa com Zod
          suppliers.value = [...suppliers.value, newSupplier] // Adiciona o novo item à lista local
        } catch (error) {
          console.error('Erro ao validar novo fornecedor:', error)
        }
      },
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'suppliers' },
      (payload) => {
        console.log('DELETE received!', payload)
        suppliers.value = suppliers.value.filter(
          (supplier) => supplier.id !== payload.old.id,
        )
      },
    )
    .subscribe()

  onUnmounted(() => {
    channel.unsubscribe()
    console.log('Canal de realtime desconectado')
  })

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
