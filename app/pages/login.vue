<script setup lang="ts">
  import type { UserLogin } from '~/types'
  const { showToast, handleError } = useHelpers()
  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'Login',
    layout: 'no-nav',
  })
  useUserStatus('/')

  const { isPending, handleLogin } = useAuth()

  const login = async (credential: UserLogin) => {
    try {
      await handleLogin(credential)
    } catch (error) {
      const err = handleError(error)
      console.error(err)
      showToast('error', 'Usuário ou Senha incorretos')
    }
  }
</script>

<template>
  <AppCard title="Login">
    <FormCredencial
      :is-pending="isPending.isLoading && isPending.action === 'handleLogin'"
      type="login"
      @on-submit="login"
    />
    <div class="d-flex align-center justify-center mx-1">
      <div>Ainda não é cadastrado?</div>
      <v-btn
        class="text-none"
        :ripple="false"
        size="small"
        slim
        to="/signup"
        variant="plain"
        >Clique aqui!</v-btn
      >
    </div>
  </AppCard>
</template>
