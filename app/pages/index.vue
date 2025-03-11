<script setup lang="ts">
  import type { AddUser } from '~/types'
  const { handleError, genFakeUsers, showToast } = useHelpers()

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Home',
    order: 0,
  })

  const { addUser, deleteUser, fakeUsers, isPending } = useRegistration()
  const { profile, testProfile } = useAuth()
  const {
    isActive: deleteConfirmModal,
    openModal: openDeleteConfirmModal,
    closeModal: closeDeleteConfirmModal,
  } = useModal()
  const formModal = ref(false)
  const openModal = () => {
    formModal.value = true
  }
  const closeModal = () => {
    formModal.value = false
  }

  //const toast = useToast()

  const addData = async (
    user: AddUser,
    onSuccess: (id: string | number) => void,
    onError: (message: string, error?: unknown) => void,
  ) => {
    try {
      const newUser = await addUser(user)
      if (!newUser) throw Error('Erro ao cadastrar usuário')
      onSuccess(newUser.id!)
      closeModal()
    } catch (error) {
      onError('Erro ao tentar inserir o usuário', error)
    }
  }

  const itemToDelete = ref<string | number>(-1)

  const handleConfirmModal = (id: string | number) => {
    itemToDelete.value = id
    openDeleteConfirmModal()
  }

  const handleCloseModal = () => {
    itemToDelete.value = -1
    closeDeleteConfirmModal()
  }

  const deleteData = async () => {
    try {
      await deleteUser(itemToDelete.value.toString())
      showToast('success', 'Excluído com sucesso')
      console.log('Usuário Excluído - Index.vue')
      handleCloseModal()
    } catch (err) {
      const e = err as Error
      const error = handleError(e)
      //showToast('error', error.message)
      console.error(error)
    }
  }

  onMounted(async () => {
    fakeUsers.value = genFakeUsers(5)
    await testProfile()
  })
</script>

<template>
  <div>
    <section>
      <AppCard title="Home">
        <p>
          Nesta página serão apresentados alguns componentes e comportamentos,
          sempre utilizando Vue com Nuxt, Typescript, Nuxt UI, Supabase, Pinia,
          etc
        </p>
      </AppCard>
    </section>
    <section>
      <AppCard title="Pinia">
        <p>
          Na página
          <AppLink
            class="hover:underline font-semibold"
            label="/counter"
            to="/modules/counter"
          />
          há um pequeno app para contar, onde clicando no + uma unidade é
          adicionada, e clicando no - uma unidade é subtraída.
        </p>
        <p>
          Este app mostra o funcionamento base do Pinia, que é uma biblioteca de
          gerenciamento de estado do Vue.
        </p>
      </AppCard>
    </section>
    <section>
      <AppCard title="Modal">
        <p>
          Clicando no botão abaixo um modal será aberto, com um formulário. Ele
          simula um formulário de cadastro, e as funções necessárias para o
          cadastro estarão em <code>/index.vue</code>, ou em um composable desde
          que seja importada. O formulário está com validação, utilizando o
          <code class="text-green-darken-3"> vee-validate + zod </code>, e não
          permite o cadastro enquanto não cumprir todas as regras de validação.
          A final, o modal é fechado.
        </p>
        <p>
          Na página
          <AppLink
            label="/about"
            to="/about"
          />
          o mesmo modal é chamado, porém, sem a função que simula o formulário,
          apenas para mostrar o comportamento padrão do componente, utilizando o
          composable <code class="text-green-darken-3">useModal()</code>
        </p>
        <AppModal
          v-model="formModal"
          title="Formulário Modal"
        >
          <FormUser
            :is-pending="isPending.isLoading && isPending.action === 'addUser'"
            @on-submit="addData"
          />
        </AppModal>
        <v-btn
          :color="formModal ? 'red' : 'primary'"
          :loading="formModal"
          text="Abrir Modal"
          @click="openModal"
        />
      </AppCard>
    </section>
    <section>
      <AppCard
        v-if="fakeUsers.length"
        subtitle="Lista de usuários geradas apenas para testes"
        title="Usuários"
      >
        <ul>
          <template
            v-if="isPending.isLoading && isPending.action === 'addUser'"
          />
          <template v-else>
            <AppList
              :is-item-pending="isPending"
              :items="fakeUsers"
              subtitle-key="email"
              title-key="name"
              @delete-click="(id) => handleConfirmModal(id)"
            />
          </template>
        </ul>
      </AppCard>
      <AppModalWithDeleteAction
        v-model="deleteConfirmModal"
        @on-cancel="handleCloseModal()"
        @on-confirm="deleteData()"
      />
    </section>
    <section>
      <AppCard title="Notification">
        <p>
          Clique no Botão abaixo para simular uma notificação utilizando o
          componente
          <code class="text-green-darken-3">UNotifications</code> juntamente com
          o composable <code class="text-green-darken-3">useToast()</code>
        </p>
        <div class="d-flex justify-space-around">
          <v-btn
            color="success"
            text="Notification Success (2s)"
            @click="
              showToast('success', 'Tudo certo com a ação. 2 segundos') //toast.add({ title: 'Testando UNotification' })
            "
          />
          <v-btn
            color="error"
            text="Notification Error (4s)"
            @click="
              showToast('error', 'Algo deu errado. 4 segundos', 4000) //toast.add({ title: 'Testando UNotification' })
            "
          />
        </div>
      </AppCard>
    </section>
    <section>
      <AppCard title="Profiles">
        {{ profile }}
      </AppCard>
    </section>
  </div>
</template>
