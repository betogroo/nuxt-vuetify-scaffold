import { ZodError } from 'zod'
import { v4 as uuid } from 'uuid'
import { fakerPT_BR as faker } from '@faker-js/faker'

import type {
  ViewUser,
  PendingState,
  PendingOptions,
  SelectOption,
  PostgrestError,
} from '~/types'

const useHelpers = () => {
  //const toast = useToast()
  const { notification } = useNotificationStore()
  type CustomError = {
    type: 'validation' | 'database' | 'unknown'
    message: string
    details?: string[]
  }

  const getRandomUUID = (): string => uuid()
  const genFakeUser = (): ViewUser => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const fullName = faker.person.fullName({ firstName, lastName })
    const email = faker.internet.email({ firstName, lastName })
    return {
      name: fullName,
      email: email,
      id: faker.string.uuid(),
      created_at: faker.date.recent().toISOString(),
    }
  }
  const genFakeUsers = (fakeUsersAmount: number = 10): ViewUser[] => {
    return Array.from({ length: fakeUsersAmount }, () => genFakeUser())
  }

  const isPostgrestError = (error: unknown): error is PostgrestError => {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'details' in error &&
      'hint' in error
    )
  }
  const handleError = (err: unknown): CustomError => {
    // Mensagens padrão
    const validationErrorMessage = 'Erro de validação nos dados fornecidos.'
    const databaseErrorMessage = 'Erro de banco de dados.'
    const unexpectedErrorMessage = 'Erro inesperado.'
    const unknownErrorMessage = 'Um erro desconhecido ocorreu.'

    if (err instanceof ZodError) {
      // Erros de validação do Zod
      const messages = err.errors.map(
        (e) => `${e.path.join('.')}: ${e.message}`,
      )
      return {
        type: 'validation',
        message: validationErrorMessage,
        details: messages,
      }
    } else if (isPostgrestError(err)) {
      // Erros do Supabase
      return {
        type: 'database',
        message: `${databaseErrorMessage} ${err.message}`,
        details: [err.hint || 'Sem detalhes adicionais.'],
      }
    } else if (err instanceof Error) {
      // Outros erros que são instâncias de Error
      return {
        type: 'unknown',
        message: `${unexpectedErrorMessage} ${err.message}`,
      }
    } else {
      // Erros não identificados
      return {
        type: 'unknown',
        message: unknownErrorMessage,
        details: [JSON.stringify(err, null, 2) || 'Sem detalhes adicionais.'],
      }
    }
  }

  /* const handleError = (err: unknown): CustomError => {
    if (err instanceof ZodError) {
      // Erros de validação do Zod
      const messages = err.errors.map(
        (e) => `${e.path.join('.')}: ${e.message}`,
      )
      return {
        type: 'validation',
        message: 'Erro de validação nos dados fornecidos.',
        details: messages,
      }
    } else if (isPostgrestError(err)) {
      // Erros do Supabase
      return {
        type: 'database',
        message: `Erro de banco de dados: ${err.message}`,
        details: [err.hint || ''],
      }
    } else if (err instanceof Error) {
      // Outros erros que são instâncias de Error
      return {
        type: 'unknown',
        message: `Erro inesperado: ${err.message}`,
      }
    } else {
      // Erros não identificados
      return {
        type: 'unknown',
        message: 'Um erro desconhecido ocorreu.',
      }
    }
  } */

  const delay = (time = 800, msg: boolean | string = false): Promise<void> => {
    if (msg) console.log(`${msg} - ${time}ms delay`)
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  const isDevelopment = () => process.env.NODE_ENV !== 'production'

  const simulateDelayInDevelopment = async (
    time = 800,
    msg: boolean | string = false,
  ) => {
    if (isDevelopment()) {
      await delay(time, msg)
    }
  }

  const showToast = (
    type: 'success' | 'error',
    message: string,
    timeout = 2000,
  ): void => {
    notification.add(message, type, timeout)
  }

  const isPending = ref<PendingState>({
    action: null,
    pendingItem: null,
    isLoading: false,
  })

  const setPendingState = async <T>(
    fn: () => Promise<T>,
    action: string,
    options: PendingOptions = {},
  ): Promise<T> => {
    const { pendingItem = null, delay = 0 } = options
    isPending.value = { action, pendingItem, isLoading: true }
    if (delay > 0)
      await simulateDelayInDevelopment(delay, `Delay de ${delay}ms para testes`)
    try {
      return await fn() // Executa a função passada como argumento (a operação principal)
    } catch (err) {
      const error = handleError(err)
      throw error // Propaga o erro, se houver
    } finally {
      isPending.value = { action: null, pendingItem: null, isLoading: false }
    }
  }

  const getOptionName = <T>(value: T, options: SelectOption<T>[]): string => {
    const option = options.find((option) => option.value === value)
    return option ? option.name : 'Outros'
  }

  const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase() + s.slice(1)
  return {
    isPending,
    capitalize,
    delay,
    genFakeUser,
    genFakeUsers,
    getOptionName,
    getRandomUUID,
    handleError,
    isDevelopment,
    setPendingState,
    showToast,
    simulateDelayInDevelopment,
  }
}

export default useHelpers
