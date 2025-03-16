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

  const initialValues = Object.fromEntries(
    Object.entries(props.initialValues).map(([key, value]) => [
      key,
      value || '',
    ]),
  )

  const { values, handleSubmit, meta, handleReset, isFieldDirty } =
    useForm<PurchasingDemandUpdate>({
      validationSchema: validatePurchasingDemandUpdate,
      initialValues,
    })

  const { value: description, errorMessage: descriptionError } =
    useField<PurchasingDemandUpdate['description']>('description')
  const { value: biddingNumber, errorMessage: biddingNumberError } =
    useField<PurchasingDemandUpdate['bidding_number']>('bidding_number')
  const { value: pncpNumber, errorMessage: pncpNumberError } =
    useField<PurchasingDemandUpdate['pncp_number']>('pncp_number')
  const { value: siafemNumber, errorMessage: siafemNumberError } =
    useField<PurchasingDemandUpdate['siafem_number']>('siafem_number')
  const { value: contractingNumber, errorMessage: contractingNumberError } =
    useField<PurchasingDemandUpdate['contracting_number']>('contracting_number')
  const { value: biddingDate, errorMessage: biddingDateError } =
    useField<PurchasingDemandUpdate['bidding_date']>('bidding_date')
  const { value: biddenOpenTime, errorMessage: biddenOpenTimeError } =
    useField<PurchasingDemandUpdate['bidding_open_time']>('bidding_open_time')
  const {
    value: externalProcessNumber,
    errorMessage: externalProcessNumberError,
  } = useField<PurchasingDemandUpdate['external_process_number']>(
    'external_process_number',
  )
  const { value: acNumber, errorMessage: acNumberError } =
    useField<PurchasingDemandUpdate['ac_number']>('ac_number')

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
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="description"
          density="compact"
          :error-messages="descriptionError"
          label="Descrição"
          :readonly="!isEditing"
          :variant="isEditing ? 'outlined' : 'plain'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="externalProcessNumber"
          density="compact"
          :error-messages="externalProcessNumberError"
          label="Processo Externo"
          :readonly="!isEditing"
          :variant="isEditing ? 'outlined' : 'plain'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="acNumber"
          density="compact"
          :error-messages="acNumberError"
          label="Número do Aviso de Contratação"
          :readonly="!isEditing"
          type="number"
          :variant="isEditing ? 'outlined' : 'plain'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="biddingNumber"
          density="compact"
          :error-messages="biddingNumberError"
          label="Número da Disputa"
          :readonly="!isEditing"
          :variant="isEditing ? 'outlined' : 'plain'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="siafemNumber"
          density="compact"
          :error-messages="siafemNumberError"
          label="Número do SIAFEM"
          :readonly="!isEditing"
          :variant="isEditing ? 'outlined' : 'plain'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="contractingNumber"
          density="compact"
          :error-messages="contractingNumberError"
          label="Número da Contratação"
          :readonly="!isEditing"
          :variant="isEditing ? 'outlined' : 'plain'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="biddingDate"
          density="compact"
          :error-messages="biddingDateError"
          label="Data da Disputa"
          :readonly="!isEditing"
          type="date"
          :variant="isEditing ? 'outlined' : 'plain'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="biddenOpenTime"
          density="compact"
          :error-messages="biddenOpenTimeError"
          label="Hora da Divulgação"
          :readonly="!isEditing"
          type="time"
          :variant="isEditing ? 'outlined' : 'plain'"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="pncpNumber"
          density="compact"
          :error-messages="pncpNumberError"
          label="Número do PNCP"
          :readonly="!isEditing"
          :variant="isEditing ? 'outlined' : 'plain'"
        />
      </v-col>
    </v-row>

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
