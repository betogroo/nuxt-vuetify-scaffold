import { productUnitRowSchema, productUnitRowsSchema } from '~/schemas'
import type { ProductUnitRow, Database } from '~/types'

const useProductUnit = () => {
  const supabase = useSupabaseClient<Database>()
  const { setPendingState, isPending: unitsPending } = useHelpers()
  const { data: productUnit, fetch: fetchProductUnit } =
    useGenericFetch<ProductUnitRow>('product_classes', productUnitRowSchema)

  const units = ref<ProductUnitRow[]>([])

  const getUnits = async (id: string) => {
    await setPendingState(async () => {
      const { data: newData, error } = await supabase
        .from('product_unit')
        .select(
          `
        id,
        ...packaging_unit!inner(
          unit_id:id,
          name,
          name_bec
        )
        `,
        )
        .eq('product_id', id)
        .returns<ProductUnitRow[]>()
      if (error) throw error
      if (newData) {
        const parsedData = productUnitRowsSchema.parse(newData)
        units.value = parsedData
      }
    }, 'product_unit')
  }
  return { productUnit, fetchProductUnit, getUnits, units, unitsPending }
}

export default useProductUnit
