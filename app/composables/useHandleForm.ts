import type { SelectOption } from '~/types'
const useHandleForm = () => {
  const { showToast, handleError } = useHelpers()

  const onHandleSuccess = (message: string, resetCallback: () => void) => {
    showToast('success', message)
    resetCallback()
  }
  const onHandleError = (message: string, error?: unknown) => {
    showToast('error', `${message}, ${handleError(error).message || ''}`)
  }

  const selectData = <T extends { name?: string | null; id: U }, U = string>(
    data: T[],
  ): SelectOption<U>[] => {
    return data.map((item) => {
      return {
        name: item.name || '',
        value: item.id,
      }
    })
  }

  return { onHandleSuccess, onHandleError, selectData }
}

export default useHandleForm
