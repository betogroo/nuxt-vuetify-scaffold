<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { ProfileUpdate } from '~/types'
  import { validateProfile } from '~/schemas'

  interface Props {
    isPending?: boolean
    initialValues: ProfileUpdate
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })
  const $emit = defineEmits<{
    'on-submit': [values: ProfileUpdate]
    'on-cancel': []
  }>()
  const { isPending } = toRefs(props)

  const { values, handleSubmit, meta } = useForm<ProfileUpdate>({
    validationSchema: validateProfile,
    initialValues: props.initialValues,
  })

  const { value: name, errorMessage: nameError } =
    useField<ProfileUpdate['name']>('name')
  const { value: email, errorMessage: emailError } =
    useField<ProfileUpdate['email']>('email')
  const { value: username, errorMessage: usernameError } =
    useField<ProfileUpdate['username']>('username')

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
      label="Nome"
      variant="outlined"
    />
    <v-text-field
      v-model="username"
      density="compact"
      :error-messages="usernameError"
      label="Usuário"
      variant="outlined"
    />
    <v-text-field
      v-model="email"
      density="compact"
      :error-messages="emailError"
      label="Email"
      variant="outlined"
    />
    <div class="d-flex">
      <v-btn
        class="mr-1"
        color="success"
        dense
        :disabled="!meta.valid"
        :loading="isPending"
        type="submit"
        >Enviar</v-btn
      >
      <v-btn
        class="mr-1"
        color="error"
        :disabled="!meta.valid"
        :loading="isPending"
        variant="tonal"
        @click.prevent="$emit('on-cancel')"
        >Cancelar</v-btn
      >
    </div>
  </v-form>
</template>
