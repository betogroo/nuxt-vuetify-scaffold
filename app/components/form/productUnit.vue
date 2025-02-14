<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { UnitRow, ProductUnitInsert } from '~/types'
  import { validateProductUnitInsert } from '~/validate'

  interface Props {
    isPending?: boolean
    units: UnitRow[]
    productId: string
  }
  const props = defineProps<Props>()
  const $emit = defineEmits<{
    'on-submit': [
      values: ProductUnitInsert,
      onSuccess: (id: string) => void,
      onError: (message: string) => void,
    ]
  }>()
  const { isPending, productId } = toRefs(props)
  const { onHandleError, onHandleSuccess } = useHandleForm()

  const { values, handleReset, handleSubmit, meta } =
    useForm<ProductUnitInsert>({
      validationSchema: validateProductUnitInsert,
      initialValues: {
        product_id: productId.value,
      },
    })

  const { value: unitId, errorMessage: unitIdError } =
    useField<ProductUnitInsert['unit_id']>('unit_id')

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('on-submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const onSuccess = (id: string) => {
    onHandleSuccess(`produto ${id} cadastrado com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    onHandleError(message)
  }
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <GenericFormAutocomplete
      v-model.number="unitId"
      :error-messages="unitIdError"
      :items="units"
      label="Pesquise pela unidade desejada"
      title-key="name"
      value-key="unit_id" />
    <generic-form-action
      :cancel-button="{
        label: 'Limpar',
        disabled: !meta.dirty,
        isPending,
        action: handleReset,
      }"
      :submit-button="{ disabled: !meta.valid, isPending, label: 'Enviar' }"
  /></v-form>
</template>
