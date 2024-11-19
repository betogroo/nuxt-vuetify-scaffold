import { teacherInsertSchema, teacherRowsSchema } from '~/schemas'
import type { TeacherInsert, TeacherRow } from '~/types'

const useTeacher = () => {
  const { isPending, addData: addTeacher } = useGenericInsert<
    TeacherInsert,
    TeacherRow
  >('teachers', teacherInsertSchema)

  const {
    isPending: dataPending,
    fetch,
    data: teachers,
  } = useGenericFetch<TeacherRow>('teachers', teacherRowsSchema)

  return { isPending, addTeacher, dataPending, fetch, teachers }
}

export default useTeacher
