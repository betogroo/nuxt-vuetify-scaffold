const useDrawer = () => {
  const isActive = ref<boolean>(false)
  const open = () => {
    isActive.value = true
  }
  const close = () => {}
  return { isActive, open, close }
}

export default useDrawer
