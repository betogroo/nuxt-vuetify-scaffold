<script setup lang="ts">
  import { validateElectionInsertSchema as validationSchema } from '~/validate/election'
  import { useField, useForm } from 'vee-validate'
  import type { ElectionInsert } from '~/types'

  interface Props {
    isPending?: boolean
  }
  withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [
      data: ElectionInsert,
      onSuccess: () => void,
      onError: (message: string) => void,
    ]
  }>()

  const { handleSubmit, meta, values, handleReset } = useForm<ElectionInsert>({
    validationSchema,
  })
  const { onHandleError, onHandleSuccess } = useHandleForm()

  const { value: name, errorMessage: nameError } =
    useField<ElectionInsert['name']>('name')
  const { value: date, errorMessage: dateError } =
    useField<ElectionInsert['date']>('date')

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('on-submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
    }
  })
  const onSuccess = () => {
    onHandleSuccess(`Eleição cadastrada com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    onHandleError(message)
  }
</script>

<template>
  <v-container>
    <v-form @submit="onSubmit">
      <v-text-field
        v-model="name"
        :error-messages="nameError"
        label="Nome da Eleição"
      />
      <v-text-field
        v-model="date"
        :error-messages="dateError"
        label="Data da Eleição"
        type="date"
      />
      <AppFormAction
        :submit-button="{
          label: 'Cadastrar',
          isPending: isPending,
          disabled: !meta.valid,
        }"
      /> </v-form
  ></v-container>
</template>
