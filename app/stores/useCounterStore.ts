export const useCounterStore = defineStore('useCounterStore', () => {
  const display = ref<number>(0)

  const increase = () => {
    display.value++
  }
  const decrease = () => {
    display.value--
  }

  const $reset = () => {
    display.value = 0
  }

  const isDisabled = computed(() => (display.value < 1 ? true : false))

  const counter = {
    increase,
    decrease,
    $reset,
    isDisabled,
    display,
  }

  return { counter }
})
