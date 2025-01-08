<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { ClassInsert } from '~/types'
  import { validateClass } from '~/validate'

  interface Props {
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })
  const $emit = defineEmits<{
    'on-submit': [values: ClassInsert]
  }>()
  const { isPending } = toRefs(props)

  const { values, handleSubmit, meta } = useForm<ClassInsert>({
    validationSchema: validateClass,
    initialValues: {
      name: '',
    },
  })

  const { value: name, errorMessage: nameError } =
    useField<ClassInsert['name']>('name')

  const onSubmit = handleSubmit(async () => {
    $emit('on-submit', values)
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
      label="Nome do Turma"
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
