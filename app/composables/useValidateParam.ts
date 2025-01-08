const useValidateParam = () => {
  const { params } = useRoute()
  const { push } = useRouter()

  const id = Array.isArray(params.id) ? params.id[0] : params.id

  try {
    if (!id || +id < 1) {
      push('/404')
      throw Error('ID Inválido')
    }
  } catch (error) {
    console.error(error)
  }

  return { id }
}

export default useValidateParam
