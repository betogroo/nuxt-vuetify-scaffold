<script setup lang="ts">
  import { useForm, useField } from 'vee-validate'
  import { validatePackagingUnitInsert } from '~/validate'
  import type { PackagingUnitInsert, PackagingUnitRow } from '~/types'

  interface Props {
    isPending: boolean
  }
  withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [
      values: PackagingUnitInsert,
      onSuccess: (id: string | number) => void,
      onError: (message: string) => void,
    ]
  }>()

  const { onHandleSuccess, onHandleError } = useHandleForm()

  const { values, handleSubmit, meta, handleReset } =
    useForm<PackagingUnitInsert>({
      validationSchema: validatePackagingUnitInsert,
    })

  const { value: name, errorMessage: errorName } =
    useField<PackagingUnitRow['name']>('name')
  const { value: nameBec, errorMessage: errorNameBec } =
    useField<PackagingUnitRow['name_bec']>('name_bec')

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('on-submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
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
  <v-container>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="name"
        :error-messages="errorName"
        label="Nome"
      />
      <v-text-field
        v-model="nameBec"
        :error-messages="errorNameBec"
        label="Equivalente BEC"
      />
      <AppFormAction
        :submit-button="{
          disabled: !meta.valid,
          isPending: isPending,
          label: 'Salvar',
        }"
      />
    </v-form>
  </v-container>
</template>
