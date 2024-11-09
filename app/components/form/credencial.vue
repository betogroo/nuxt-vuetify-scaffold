<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { UserLogin, UserSignup, CredencialType } from '~/types'
  import { validationLogin, validationSignup } from '~/schemas'

  interface Props {
    type: CredencialType
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [values: UserSignup | UserLogin]
  }>()

  const { type, isPending } = toRefs(props)

  const label = ref(type.value === 'login' ? 'Login' : 'Cadastrar')

  const userCredencial = ref<UserSignup | UserLogin>({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const { values, handleSubmit, meta } = useForm<UserLogin | UserSignup>({
    validationSchema:
      type.value === 'login' ? validationLogin : validationSignup,
    initialValues: userCredencial.value,
  })

  const { value: email, errorMessage: emailError } = useField<string>('email')
  const { value: password, errorMessage: passwordError } =
    useField<string>('password')
  const { value: passwordConfirm, errorMessage: passwordConfirmError } =
    useField<string>('passwordConfirm')

  const onSubmit = handleSubmit(async () => {
    $emit('on-submit', values)
  })
</script>

<template>
  <v-form
    class="pa-2"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="email"
      clearable
      density="compact"
      :error-messages="emailError"
      label="email@exemplo.com.br"
      :prepend-inner-icon="iconOutline.email"
      variant="outlined" />
    <div class="my-1">
      <v-text-field
        v-model="password"
        clearable
        density="compact"
        :error-messages="passwordError"
        label="Digite sua senha"
        :prepend-inner-icon="iconOutline.password"
        type="password"
        variant="outlined"
      />
      <div class="my-1">
        <v-text-field
          v-if="type === 'signup'"
          v-model="passwordConfirm"
          clearable
          density="compact"
          :error-messages="passwordConfirmError"
          label="Confirme a senha"
          :prepend-inner-icon="iconOutline.password"
          type="password"
          variant="outlined"
        />

        <div class="d-flex justify-end">
          <v-btn
            block
            color="success"
            :disabled="!meta.valid"
            :loading="isPending"
            :text="label"
            type="submit"
          />
        </div>
      </div></div
  ></v-form>
</template>
