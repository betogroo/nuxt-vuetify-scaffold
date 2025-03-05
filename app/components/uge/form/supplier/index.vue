<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { SupplierInsert } from '~/types'
  import { validateSupplierInsert } from '~/validate'

  interface Props {
    isPending?: boolean
  }
  withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [
      data: SupplierInsert,
      onSuccess: (name: string) => void,
      onError: (message: string) => void,
    ]
  }>()

  const { onHandleError, onHandleSuccess } = useHandleForm()

  const { handleSubmit, handleReset, values, meta } = useForm<SupplierInsert>({
    validationSchema: validateSupplierInsert,
  })

  const { value: name, errorMessage: nameError } =
    useField<SupplierInsert['name']>('name')
  const { value: cnpj, errorMessage: cnpjError } =
    useField<SupplierInsert['cnpj']>('cnpj')
  const { value: representative, errorMessage: representativeError } =
    useField<SupplierInsert['representative']>('representative')

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('on-submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
    }
  })

  const onSuccess = (name: string) => {
    onHandleSuccess(`Fornecedor ${name} cadastrada com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    onHandleError(message)
  }
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="name"
      :error-messages="nameError"
      label="Nome"
    />
    <v-text-field
      v-model="cnpj"
      :error-messages="cnpjError"
      label="CNPJ"
    />
    <v-text-field
      v-model="representative"
      :error-messages="representativeError"
      label="Nome do Representante"
    />

    <AppFormAction
      :submit-button="{
        disabled: !meta.valid,
        isPending: isPending,
        label: 'Salvar',
      }"
    />
  </v-form>
</template>
