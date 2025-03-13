<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { PurchasingDemand, PurchasingDemandUpdate } from '~/types'
  import { validatePurchasingDemandUpdate } from '~/validate'

  interface Props {
    isPending?: boolean
    initialValues: PurchasingDemand
    isEditing?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
    isEditing: false,
  })
  const $emit = defineEmits<{
    submit: [
      values: PurchasingDemandUpdate,
      onSuccess: (id: string | number) => void,
      onError: (message: string) => void,
    ]
    edit: []
  }>()

  const { isPending } = toRefs(props)
  const { onHandleSuccess, onHandleError } = useHandleForm()

  const { values, handleSubmit, meta, handleReset } =
    useForm<PurchasingDemandUpdate>({
      validationSchema: validatePurchasingDemandUpdate,
      initialValues: {
        description: props.initialValues.description
          ? props.initialValues.description
          : 'Favor Preencher,',
        external_process_number: props.initialValues.external_process_number
          ? props.initialValues.external_process_number
          : 'Favor Preencher,',
      },
    })

  const { value: description, errorMessage: descriptionError } =
    useField<PurchasingDemandUpdate['description']>('description')
  const {
    value: externalProcessNumber,
    errorMessage: externalProcessNumberError,
  } = useField<PurchasingDemandUpdate['external_process_number']>(
    'external_process_number',
  )

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const onReset = () => {
    handleReset()
    $emit('edit')
  }

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
      v-model="description"
      density="compact"
      :error-messages="descriptionError"
      label="Descrição"
      :readonly="!isEditing"
      :variant="isEditing ? 'outlined' : 'plain'"
    />
    <v-text-field
      v-model="externalProcessNumber"
      density="compact"
      :disabled="!isEditing"
      :error-messages="externalProcessNumberError"
      label="Processo Externo"
      :variant="isEditing ? 'outlined' : 'plain'"
    />

    <AppFormAction
      v-if="isEditing"
      :cancel-button="{
        label: 'Cancelar',
        isPending,
        action: onReset,
      }"
      :submit-button="{ disabled: !meta.valid, isPending, label: 'Salvar' }"
    />
    <v-btn
      v-else
      block
      @click="$emit('edit')"
      >Editar Dados</v-btn
    >
  </v-form>
</template>
