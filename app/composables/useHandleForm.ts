const useHandleForm = () => {
  const { showToast, handleError } = useHelpers()

  const onHandleSuccess = (message: string, resetCallback: () => void) => {
    showToast('success', message)
    resetCallback()
  }
  const onHandleError = (message: string, error?: unknown) => {
    showToast('error', `${message}, ${handleError(error).message || ''}`)
  }
  return { onHandleSuccess, onHandleError }
}

export default useHandleForm
