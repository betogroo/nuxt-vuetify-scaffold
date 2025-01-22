import type { Database, Tables } from '~/types'

const useGenericDelete = <T extends Record<string, string | number>>(
  tableName: Tables,
) => {
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
        if (error) throw error
        return deletedData
      },
      `delete-${tableName}`,
      { pendingItem: id },
    )
  }

  const deleteDataByFilters = async (filters: T) => {
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
      { pendingItem: filters, delay: 5000 },
    )
  }
  return { deleteDataById, deleteDataByFilters, deletePending }
}

export default useGenericDelete
