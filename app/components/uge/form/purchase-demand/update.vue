<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type {
    PurchasingDemand,
    PurchasingDemandUpdate,
    DirtyPurchasingDemandUpdate,
  } from '~/types'
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
      values: DirtyPurchasingDemandUpdate,
      onSuccess: () => void,
      onError: (message: string) => void,
    ]
    edit: []
  }>()

  const { isPending } = toRefs(props)
  const { onHandleSuccess, onHandleError } = useHandleForm()

  const { values, handleSubmit, meta, handleReset, isFieldDirty } =
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

  // only dirty fields
  const getDirtyValues = () => {
    const fieldKeys = Object.keys(props.initialValues) as Array<
      keyof PurchasingDemandUpdate
    >
    const dirtyValues: DirtyPurchasingDemandUpdate = {}
    fieldKeys.forEach((key) => {
      if (isFieldDirty(key)) {
        dirtyValues[key] = values[key]
      }
    })

    return dirtyValues
  }

  const onSubmit = handleSubmit(async () => {
    try {
      const dirtyValues = getDirtyValues()
      $emit('submit', dirtyValues, onSuccess, onError)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const onReset = () => {
    handleReset()
    $emit('edit')
  }

  const onSuccess = () => {
    $emit('edit')
    onHandleSuccess(`Editado com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    handleReset()
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
      :error-messages="externalProcessNumberError"
      label="Processo Externo"
      :readonly="!isEditing"
      :variant="isEditing ? 'outlined' : 'plain'"
    />

    <AppFormAction
      v-if="isEditing"
      :cancel-button="{
        label: 'Cancelar',
        isPending,
        action: onReset,
      }"
      :submit-button="{
        disabled: !meta.valid || !meta.dirty,
        isPending,
        label: 'Salvar',
      }"
    />
    <v-btn
      v-else
      block
      @click="$emit('edit')"
      >Editar Dados</v-btn
    >
  </v-form>
</template>
