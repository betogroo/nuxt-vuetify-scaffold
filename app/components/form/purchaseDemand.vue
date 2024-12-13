<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { PurchasingDemandInsert } from '~/types'
  import { validatePurchasingDemand } from '~/schemas'

  interface Props {
    isPending?: boolean
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
  const { fetchProfiles, profiles } = useProfile()
  const { onHandleSuccess, onHandleError } = useHandleForm()

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
    onHandleSuccess(id, `Demanda ${id} cadastrada com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    onHandleError(message)
  }

  await fetchProfiles()
  const selectProfileData = profiles.value.map((item) => {
    return {
      name: item.name,
      value: item.id,
    }
  })
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
    <v-select
      v-model="ptresNumber"
      density="compact"
      :error-messages="ptresNumberError"
      :items="ptresNumbers"
      label="Escolha o PTRES"
      variant="outlined"
    />
    <v-select
      v-model="contractingAgentId"
      density="compact"
      :error-messages="contractingAgentIdError"
      item-title="name"
      :items="selectProfileData"
      label="Escolha o Agente de Contratação"
      variant="outlined"
    />
    <div class="d-flex justify-space-around">
      <v-btn
        color="success"
        :disabled="!meta.valid"
        :loading="isPending"
        type="submit"
        >Enviar</v-btn
      >
      <v-btn
        color="red"
        :disabled="!meta.dirty"
        :loading="isPending"
        @click="handleReset"
        >Limpar</v-btn
      >
    </div>
  </v-form>
</template>
