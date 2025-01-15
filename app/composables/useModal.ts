import { z } from 'zod'
export const modalPropsSchema = z.object({
  title: z.string().default('Modal').optional(),
  mode: z.string().default('default').optional(),
})

export type ModalProps = z.infer<typeof modalPropsSchema>
const useModal = (
  defaultProps: Partial<ModalProps> = { title: 'Modal', mode: 'default' },
) => {
  const isActive = ref<boolean>(false)

  const props = ref<ModalProps>(modalPropsSchema.parse(defaultProps))

  const openModal = (modalProps: Partial<ModalProps>) => {
    const parsedProps = modalPropsSchema.parse(modalProps)
    props.value = {
      ...props.value,
      ...parsedProps,
    }
    isActive.value = true
  }
  const closeModal = () => {
    isActive.value = false
  }
  return {
    props,
    isActive,
    openModal,
    closeModal,
  }
}

export default useModal
