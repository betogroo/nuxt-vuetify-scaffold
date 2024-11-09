export const useNotificationStore = defineStore('useNotificationStore', () => {
  const isActive = ref(false)
  const message = ref('')
  const type = ref('')

  const add = (newMessage: string, newType: string) => {
    message.value = newMessage
    isActive.value = true
    type.value = newType
  }

  const notification = { isActive, message, type, add }

  return { notification }
})
