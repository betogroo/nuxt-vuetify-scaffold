const useHandleForm = () => {
  const { showToast } = useHelpers()

  const onHandleSuccess = (
    id: string | number,
    message: string,
    resetCallback: () => void,
  ) => {
    showToast('success', message)
    resetCallback()
  }
  const onHandleError = (message: string) => {
    showToast('error', message)
  }
  return { onHandleSuccess, onHandleError }
}

export default useHandleForm
