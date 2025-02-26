import {
  productUnitInsertSchema,
  productUnitRowSchema,
  productUnitRowsSchema,
} from '~/schemas'
import type {
  ProductUnitRow,
  Database,
  UnitRow,
  ProductUnitInsert,
} from '~/types'

const useProductUnit = () => {
  const supabase = useSupabaseClient<Database>()
  const { setPendingState, isPending: unitsPending } = useHelpers()
  const { data: productUnit, fetch: fetchProductUnit } =
    useGenericFetch<ProductUnitRow>('product_classes', productUnitRowSchema)

  const units = ref<ProductUnitRow[]>([])
  const availableUnits = ref<UnitRow[]>([])

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
  const getAvailableUnits = async (product_id: string) => {
    return setPendingState(async () => {
      const { data, error } = await supabase.rpc('get_available_unit', {
        product_id,
      })
      if (error) throw error
      if (data) availableUnits.value = data
    }, 'get-available-support_team')
  }

  const { insert: addUnitToProduct, insertPending: addUnitToProductPending } =
    useGenericInsert<ProductUnitInsert, ProductUnitRow>(
      'product_unit',
      productUnitInsertSchema,
    )

  return {
    productUnit,
    fetchProductUnit,
    getUnits,
    units,
    unitsPending,
    getAvailableUnits,
    availableUnits,
    addUnitToProduct,
    addUnitToProductPending,
  }
}

export default useProductUnit
