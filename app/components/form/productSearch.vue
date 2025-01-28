<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { ProductName } from '~/types'
  import { validateProductName } from '~/validate'

  interface Props {
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })
  const $emit = defineEmits<{
    'on-submit': [
      values: ProductName,
      onSuccess: (id: string | number) => void,
      onError: (message: string) => void,
    ]
  }>()

  const { isPending } = toRefs(props)
  const { onHandleSuccess, onHandleError } = useHandleForm()

  const { values, handleSubmit, meta, handleReset } = useForm<ProductName>({
    validationSchema: validateProductName,
  })

  const { value: name, errorMessage: nameError } = useField<ProductName>('name')

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('on-submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const onSuccess = (id: string | number) => {
    onHandleSuccess(`Demanda ${id} cadastrada com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    onHandleError(message)
  }
</script>

<template>
  <v-form
    class="pa-2 ma-2"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="name"
      density="compact"
      :error-messages="nameError"
      label="Pesquise pelo nome do produto"
      variant="outlined"
    />

    <generic-form-action
      :cancel-button="{
        label: 'Limpar',
        disabled: !meta.dirty,
        isPending,
        action: handleReset,
      }"
      :submit-button="{ disabled: !meta.valid, isPending, label: 'Enviar' }"
    />
  </v-form>
</template>
