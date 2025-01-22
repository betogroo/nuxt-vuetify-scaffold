import type { Database, Tables } from '~/types'

const useGenericDelete = (tableName: Tables) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: deletePending, setPendingState } = useHelpers()
  const deleteDataById = async (id: string | number) => {
    return setPendingState(
      async () => {
        const { data: deletedData, error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', id)
          .select()
          .returns()
        if (error) throw error
        return deletedData
      },
      `delete-${tableName}`,
      { itemId: id },
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteDataByFilters = async (filters: Record<string, any>) => {
    return setPendingState(
      async () => {
        let query = supabase.from(tableName).delete()
        for (const [key, value] of Object.entries(filters)) {
          query = query.eq(key, value).select() as typeof query
        }
        const { data, error } = await query
        if (error) throw error
        return data
      },
      `delete-${tableName}`,
      { itemId: filters, delay: 5000 },
    )
  }
  return { deleteDataById, deleteDataByFilters, deletePending }
}

export default useGenericDelete
