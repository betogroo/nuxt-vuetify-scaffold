<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import { validateSupportTeam } from '~/validate'
  import type { MemberOption, SupportTeam } from '~/types'
  interface Props {
    purchasingDemandId: number
    memberOption: MemberOption[]
    isPending?: boolean
  }
  const props = defineProps<Props>()

  const $emit = defineEmits<{
    'on-submit': [
      values: SupportTeam,
      onSuccess: (message: string) => void,
      onError: (message: string) => void,
    ]
  }>()

  const { isPending } = toRefs(props)

  const { onHandleSuccess, onHandleError } = useHandleForm()

  const { values, handleSubmit, meta, handleReset } = useForm<SupportTeam>({
    validationSchema: validateSupportTeam,
    initialValues: {
      process_id: props.purchasingDemandId,
    },
  })

  const { value: member, errorMessage: memberError } =
    useField<SupportTeam['profile_id']>('profile_id')

  const onSubmit = handleSubmit(async () => {
    try {
      $emit('on-submit', values, onSuccess, onError)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const onSuccess = (message: string) => {
    onHandleSuccess(message, handleReset)
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
    <generic-form-autocomplete
      v-model="member"
      :error-messages="memberError"
      :items="memberOption"
      label="Selecione um Funcionário disponível"
      title-key="name"
      value-key="id"
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
