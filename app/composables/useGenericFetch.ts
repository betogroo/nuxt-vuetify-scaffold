import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericFetch = <RowType>(tableName: Tables, schema: ZodSchema) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: fetchPending, setPendingState } = useHelpers()
  const data = ref<RowType[]>([])

  const fetch = async (
    orderBy?: { column?: string; ascending?: boolean },
    columns?: string | string[],
  ) => {
    return setPendingState(async () => {
      const column = orderBy?.column || 'id'
      const ascending = orderBy?.ascending ?? true
      const selectedColumns = Array.isArray(columns)
        ? columns.join(', ')
        : columns || '*'
      const { data: newData, error } = await supabase
        .from(tableName)
        .select(selectedColumns)
        .order(column, { ascending })
        .returns<RowType>()
      if (error) throw error
      if (newData) {
        const parsedData = schema.parse(newData)
        data.value = parsedData
      }
    }, `fetch-${tableName}`)
  }
  return { fetchPending, data, fetch }
}

export default useGenericFetch
