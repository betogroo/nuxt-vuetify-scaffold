<script setup lang="ts">
  import { useForm, useField } from 'vee-validate'
  import type { OfferInsert, SupplierRow } from '~/types'
  import { validateOfferInsert } from '~/validate'

  interface Props {
    isPending?: boolean
    suppliersSelectItems: SupplierRow[]
  }
  withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    submit: [
      values: OfferInsert,
      onSuccess: () => void,
      onError: (message: string) => void,
    ]
  }>()

  const { onHandleError, onHandleSuccess } = useHandleForm()

  const { values, handleSubmit, handleReset, meta } = useForm<OfferInsert>({
    validationSchema: validateOfferInsert,
  })

  const { value: supplierId, errorMessage: supplierIdError } =
    useField<OfferInsert['supplier_id']>('supplier_id')

  const { value: offerValue, errorMessage: offerValueError } =
    useField<OfferInsert['offer_value']>('offer_value')

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
    }
  })

  const onSuccess = () => {
    onHandleSuccess(`Oferta cadastrada com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    onHandleError(message)
  }
</script>

<template>
  <v-container>
    <v-form @submit="onSubmit">
      <generic-form-autocomplete
        v-model="supplierId"
        :error-messages="supplierIdError"
        :items="suppliersSelectItems"
        label="Escolha um fornecedor"
        title-key="name"
        value-key="id"
      />
      <v-text-field
        v-model.number="offerValue"
        :error-messages="offerValueError"
        label="Valor da Oferta"
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
  </v-container>
</template>
