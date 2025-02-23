<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import { validateProductClassInsert } from '~/validate'

  import type { ProductClassInsert, ProductClassRow } from '~/types'

  interface Props {
    isPending?: boolean
  }
  defineProps<Props>()

  const $emit = defineEmits<{
    'on-submit': [
      values: ProductClassInsert,
      onSuccess: (id: string | number) => void,
      onError: (message: string) => void,
    ]
  }>()
  const { onHandleSuccess, onHandleError } = useHandleForm()

  const { values, handleSubmit, handleReset, meta } =
    useForm<ProductClassInsert>({
      validationSchema: validateProductClassInsert,
    })
  const { value: id, errorMessage: idError } =
    useField<ProductClassInsert['id']>('id')
  const { value: name, errorMessage: nameError } =
    useField<ProductClassInsert['name']>('name')

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('on-submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const onSuccess = () => {
    onHandleSuccess(`Editado com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    handleReset()
    onHandleError(message)
  }
</script>

<template>
  <v-container>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model.number="id"
        density="compact"
        :error-messages="idError"
        label="Número da Classe"
        type="number"
        variant="outlined"
      />
      <v-text-field
        v-model="name"
        density="compact"
        :error-messages="nameError"
        label="Nome da Classe"
        variant="outlined"
      />
      <v-btn
        :disabled="!meta.valid"
        type="submit"
        >Enviar</v-btn
      >
    </v-form>
  </v-container>
</template>
