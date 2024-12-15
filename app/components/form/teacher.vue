<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { TeacherInsert } from '~/types'
  import { validateTeacher } from '~/schemas'

  interface Props {
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })
  const $emit = defineEmits<{
    'on-submit': [
      values: TeacherInsert,
      onSuccess: (id: string | number) => void,
      onError: (message: string) => void,
    ]
  }>()
  const { isPending } = toRefs(props)
  const { onHandleSuccess, onHandleError } = useHandleForm()

  const { values, handleSubmit, meta, handleReset } = useForm<TeacherInsert>({
    validationSchema: validateTeacher,
    initialValues: {
      name: '',
    },
  })

  const { value: name, errorMessage: nameError } =
    useField<TeacherInsert['name']>('name')

  const onSuccess = (id: string | number) => {
    onHandleSuccess(id, `Professor ${id} cadastrado com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    onHandleError(message)
  }

  const onSubmit = handleSubmit(async () => {
    $emit('on-submit', values, onSuccess, onError)
  })
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
      label="Nome do Professor"
      variant="outlined"
    />
    <v-btn
      color="success"
      :disabled="!meta.valid"
      :loading="isPending"
      type="submit"
      >Enviar</v-btn
    >
  </v-form>
</template>
