<script setup lang="ts">
  import type { UserSignup } from '~/types'
  const { showToast, handleError } = useHelpers()

  definePageMeta({
    showInNavBar: false,
    requiresAuth: false,
    title: 'Login',
    layout: 'no-nav',
  })
  useUserStatus('/')
  const {
    isPending,
    success,
    handleSignUp,
    remainingTime,
    resendEmailConfirmation,
  } = useAuth()

  const signup = async (credential: UserSignup) => {
    try {
      await handleSignUp(credential)
    } catch (error) {
      const err = handleError(error)
      showToast('error', err.message)
    }
  }
</script>

<template>
  <AppCard title="Cadastro">
    <div v-if="!success">
      <FormCredencial
        :is-pending="isPending.isLoading && isPending.action === 'handleSignUp'"
        type="signup"
        @on-submit="signup"
      />
      <div class="d-flex align-center justify-center mx-1">
        <div>Já é cadastrado?</div>
        <v-btn
          class="text-none"
          :ripple="false"
          slim
          to="/login"
          variant="plain"
          >Faça Login</v-btn
        >
      </div>
    </div>
    <div v-else>
      <p>
        Um link para confirmação de cadastro foi enviado para o email
        {{ success }}
      </p>
      <p>Aguarde alguns instantes, por favor.</p>
      <v-btn
        :disabled="remainingTime > 0"
        :loading="
          isPending.isLoading && isPending.action === 'resendEmailConfirmation'
        "
        @click="resendEmailConfirmation(success)"
        >Reenviar</v-btn
      >
    </div>
  </AppCard>
</template>
