<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import { validationUserSchema } from '~/schemas'
  import type { AddUser } from '~/types'

  import { fakerPT_BR as faker } from '@faker-js/faker'

  interface Props {
    isPending?: boolean
  }

  withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    onSubmit: [
      values: AddUser,
      onSuccess: (id: string | number) => void,
      onError: (message: string) => void,
    ]
  }>()
  const { onHandleSuccess, onHandleError } = useHandleForm()

  const { values, handleSubmit, meta, resetForm, handleReset } =
    useForm<AddUser>({
      validationSchema: validationUserSchema,
      // fake pre-filled form
      initialValues: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    })

  const { value: name, errorMessage: nameError } = useField<string>('name')
  const { value: email, errorMessage: emailError } = useField<string>('email')

  const onSuccess = (id: string | number) => {
    onHandleSuccess(`Professor ${id} cadastrado com sucesso`, handleReset)
  }
  const onError = (message: string) => {
    onHandleError(message)
  }

  const addData = handleSubmit(async () => {
    //$emit('onSubmit', { name: 'dddd', email: 'emam' })
    $emit('onSubmit', values, onSuccess, onError)
  })
</script>

<template>
  <v-form
    class="pa-2"
    @submit.prevent="addData"
  >
    <v-text-field
      v-model="name"
      class="pa-2"
      density="compact"
      :error-messages="nameError"
      label="Nome"
      variant="outlined"
    />
    <v-text-field
      v-model="email"
      class="pa-2"
      density="compact"
      :error-messages="emailError"
      label="Email"
      variant="outlined"
    />

    <div
      class="d-flex justify-end"
      style="gap: 8px"
    >
      <v-btn
        color="success"
        :disabled="!meta.valid"
        :loading="isPending"
        text="Enviar"
        type="submit"
      />
      <v-btn
        color="red"
        text="Limpar"
        variant="outlined"
        @click="resetForm()"
      />
    </div>
  </v-form>
</template>
