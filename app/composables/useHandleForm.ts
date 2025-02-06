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

  const selectData = <
    T extends Record<string, unknown>,
    U extends string | number,
  >(
    data: (T & { id: U; name?: string | null })[],
  ): SelectOption<U>[] => {
    return data.map((item) => ({
      name: item.name ?? '',
      value: item.id,
    }))
  }

  return { onHandleSuccess, onHandleError, selectData }
}

export default useHandleForm
