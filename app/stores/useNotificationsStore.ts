export const useNotificationStore = defineStore('useNotificationStore', () => {
  const isActive = ref(false)
  const message = ref('')
  const type = ref('')
  const timeout = ref(2000)

  const add = (newMessage: string, newType: string, newTimeout?: number) => {
    message.value = newMessage
    type.value = newType
    isActive.value = true
    timeout.value = newTimeout || 2000
  }

  const notification = { isActive, message, type, timeout, add }

  return { notification }
})
