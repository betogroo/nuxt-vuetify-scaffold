import { z } from 'zod'
export const modalPropsSchema = z.object({
  title: z.string().default('Modal').optional(),
  mode: z.string().default('default').optional(),
})

export type ModalProps = z.infer<typeof modalPropsSchema>
const useModal = () => {
  const isActive = ref<boolean>(false)
  const defaultProps: ModalProps = {
    title: 'Modal',
    mode: 'default',
  }
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
    props.value = { ...modalPropsSchema.parse(defaultProps) }
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
