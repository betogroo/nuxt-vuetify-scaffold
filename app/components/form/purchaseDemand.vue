<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { PurchasingDemandInsert, Profile } from '~/types'
  import { validatePurchasingDemand } from '~/validate'

  interface Props {
    isPending?: boolean
    selectProfileData: Profile[]
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })
  const $emit = defineEmits<{
    'on-submit': [
      values: PurchasingDemandInsert,
      onSuccess: (id: string | number) => void,
      onError: (message: string) => void,
    ]
  }>()

  const { isPending } = toRefs(props)
  const { onHandleSuccess, onHandleError, selectData } = useHandleForm()

  const { values, handleSubmit, meta, handleReset } =
    useForm<PurchasingDemandInsert>({
      validationSchema: validatePurchasingDemand,
    })

  const { value: description, errorMessage: descriptionError } =
    useField<PurchasingDemandInsert['description']>('description')
  const { value: ptresNumber, errorMessage: ptresNumberError } =
    useField<PurchasingDemandInsert['ptres_number']>('ptres_number')
  const { value: contractingAgentId, errorMessage: contractingAgentIdError } =
    useField<PurchasingDemandInsert['contracting_agent_id']>(
      'contracting_agent_id',
    )

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('on-submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
      throw error
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
  <v-form
    class="pa-2 ma-2"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="description"
      density="compact"
      :error-messages="descriptionError"
      label="Descrição"
      variant="outlined"
    />

    <generic-form-select
      v-model="ptresNumber"
      :error-messages="ptresNumberError"
      :items="ptresNumbers"
      label="Escolha o PTRES"
    />
    <generic-form-select
      v-model="contractingAgentId"
      :error-messages="contractingAgentIdError"
      :items="selectData(selectProfileData)"
      label="Escolha o Agente de Contratação"
    />
    <generic-form-action
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
