import { productUnitRowSchema } from '~/schemas'
import type { ProductUnitRow, Database } from '~/types'

const useProductUnit = () => {
  const supabase = useSupabaseClient<Database>()
  const { data: productUnit, fetch: fetchProductUnit } =
    useGenericFetch<ProductUnitRow>('product_classes', productUnitRowSchema)

  const units = ref<ProductUnitRow[]>([])

  const getUnits = async (id: string) => {
    const { data, error } = await supabase
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
    if (!error) units.value = data
  }
  return { productUnit, fetchProductUnit, getUnits, units }
}

export default useProductUnit
