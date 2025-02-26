<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type {
    ProductInsert,
    ProductClassRow,
    ProductExpenseCategoryRow,
  } from '~/types'
  import { validateProduct } from '~/validate'

  interface Props {
    isPending?: boolean
    productClassesSelectItems: ProductClassRow[]
    productExpenseCategorySelectItems: ProductExpenseCategoryRow[]
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [
      values: ProductInsert,
      onSuccess: (id: string) => void,
      onError: (message: string) => void,
    ]
  }>()

  const { isPending } = toRefs(props)

  // composables
  const { onHandleError, onHandleSuccess } = useHandleForm()
  const { values, handleSubmit, meta, handleReset } = useForm<ProductInsert>({
    validationSchema: validateProduct,
  })

  const { value: name, errorMessage: nameError } =
    useField<ProductInsert['name']>('name')
  const { value: catMat, errorMessage: catMatError } =
    useField<ProductInsert['cat_mat']>('cat_mat')
  const { value: becNumber, errorMessage: becNumberError } =
    useField<ProductInsert['bec_number']>('bec_number')
  const { value: productClassId, errorMessage: productClassIdError } =
    useField<ProductInsert['product_class_id']>('product_class_id')
  const { value: expenseCategoryId, errorMessage: expenseCategoryIdError } =
    useField<ProductInsert['expense_category_id']>('expense_category_id')
  const { value: pdmNumber, errorMessage: pdmNumberError } =
    useField<ProductInsert['pdm_number']>('pdm_number')

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
  <v-form
    class="pa-2 ma-2"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="name"
      density="compact"
      :error-messages="nameError"
      label="Name"
      variant="outlined"
    />
    <v-text-field
      v-model.number="catMat"
      density="compact"
      :error-messages="catMatError"
      label="Cat Mat"
      variant="outlined"
    />
    <v-text-field
      v-model.number="becNumber"
      density="compact"
      :error-messages="becNumberError"
      label="Número da BEC"
      variant="outlined"
    />

    <generic-form-autocomplete
      v-model.number="productClassId"
      composite-title
      :error-messages="productClassIdError"
      :items="productClassesSelectItems"
      label="Escolha a classe"
    />
    <generic-form-autocomplete
      v-model.number="expenseCategoryId"
      composite-title
      :error-messages="expenseCategoryIdError"
      :items="productExpenseCategorySelectItems"
      label="Escolha a Natureza"
    />

    <v-text-field
      v-model.number="pdmNumber"
      density="compact"
      :error-messages="pdmNumberError"
      label="PDM"
      variant="outlined"
    />
    <AppFormAction
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
