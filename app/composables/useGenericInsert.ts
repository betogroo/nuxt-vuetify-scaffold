//import type { Database } from '~/types/supabase'
import type { ZodSchema } from 'zod'
import type { Database, Tables } from '~/types'

const useGenericInsert = <InsertType, RowType>(
  tableName: Tables, //ver refatoração
  schema: ZodSchema,
) => {
  const supabase = useSupabaseClient<Database>()
  const { isPending: insertPending, setPendingState } = useHelpers()

  const insert = async (data: InsertType | InsertType[]) => {
    return setPendingState(
      async () => {
        const parsedData = Array.isArray(data)
          ? data.map((item) => schema.parse(item))
          : schema.parse(data)
        const { data: newInsert, error } = await supabase
          .from(tableName)
          .insert(parsedData)
          .select()
          .returns<RowType>()
          .single()
        if (error) throw error
        return newInsert
        //return Array.isArray(data) ? newInsert : newInsert?.[0]
      },
      `add-${tableName}`,
      { delay: 2000 },
    )
  }
  return { insertPending, insert }
}

export default useGenericInsert
