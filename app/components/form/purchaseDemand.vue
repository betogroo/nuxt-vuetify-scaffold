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
    'on-submit': [values: PurchasingDemandInsert]
  }>()

  const { isPending } = toRefs(props)
  const { fetchProfiles, profiles } = useProfile()
  const initialValues = ref<PurchasingDemandInsert>({
    contracting_agent_id: undefined,
    description: '',
    ptres_number: undefined,
  })

  const { values, handleSubmit, meta, handleReset } =
    useForm<PurchasingDemandInsert>({
      validationSchema: validatePurchasingDemand,
      initialValues: initialValues.value,
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
      $emit('on-submit', values)
      handleReset()
    } catch (error) {
      console.error(error)
    }
  })

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
    <v-btn
      color="success"
      :disabled="!meta.valid"
      :loading="isPending"
      type="submit"
      >Enviar</v-btn
    >
    <div>{{ selectProfileData }}</div>
  </v-form>
</template>
