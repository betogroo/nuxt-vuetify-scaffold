<script setup lang="ts">
  import type {
    PurchasingDemandInsert,
    PurchasingDemand,
    SupportTeam,
  } from '~/types'

  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'UGE - Demandas',
  })

  // Composables
  const { push } = useRouter()
  const { props, isActive, openModal, closeModal } = useModal()

  const {
    demands,
    demandTableColumns,
    purchasingDemandDetailsPending,
    purchasingInsertPending,
    fetchPurchasingDemandRows,
    insertPurchasingDemand,
  } = usePurchasingDemand()

  const {
    members,
    availableSupportTeamMember,
    insertMemberPending,
    fetchMembers,
    getAvailableSupportTeam,
    insertMember,
    deleteMember: _deleteMember,
  } = useMemberTeam()

  const submitDemand = async (
    data: PurchasingDemandInsert,
    onSuccess: (id: string | number) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData: PurchasingDemand = await insertPurchasingDemand(data)
      if (!insertedData) throw Error('Erro ao tentar inserir a demanda')
      onSuccess(insertedData.id)
      closeModal()
      push(`/uge/demand/${insertedData.id}`)
    } catch (error) {
      onError(`Erro ao tentar inserir a demanda`, error)
    }
  }

  const purchasingDemandId = ref<number>()

  const openSupportMemberModal = async (id: number) => {
    await getAvailableSupportTeam(id)
    openModal({
      title: 'Novo Membro na Equipe de Apoio',
      mode: 'support-member',
    })
    purchasingDemandId.value = id
  }

  const submitSupportMemberForm = async (
    data: SupportTeam,
    onSuccess: (message: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData: SupportTeam = await insertMember(data)
      if (!insertedData) throw Error('Erro ao tentar inserir a demanda')
      await fetchPurchasingDemandRows()
      onSuccess('Membro adicionado à demanda com sucesso')
      closeModal()
      //push(`/uge/demand/${insertedData.id}`)
    } catch (error) {
      console.log(error)
      onError(`Erro ao tentar inserir a demanda`, error)
    }
  }

  const deleteMember = async (process_id: number, profile_id: string) => {
    await _deleteMember({ process_id, profile_id })
    await fetchPurchasingDemandRows()
  }

  onMounted(async () => {
    await fetchPurchasingDemandRows()
    await fetchMembers(undefined, ['id, name'])
  })
</script>

<template>
  <v-container class="fill-height flex-column justify-space-between">
    <div class="w-100">
      <UgeTablePurchasingDemand
        :columns="demandTableColumns"
        :is-pending="
          purchasingDemandDetailsPending.isLoading &&
          purchasingDemandDetailsPending.action ===
            'fetch-purchasing-demand-details'
        "
        :rows="demands"
        title="Demandas"
        @add-member="openSupportMemberModal"
        @delete-member="deleteMember"
      />
      <AppModal
        v-model="isActive"
        :title="props.title"
      >
        <UgeFormPurchaseDemand
          v-if="props.mode === 'purchasing-demand'"
          :is-pending="purchasingInsertPending.isLoading"
          :member-option="members"
          @on-submit="
            (values, onSuccess, onError) =>
              submitDemand(values, onSuccess, onError)
          "
        />

        <UgeFormSupportTeam
          v-if="props.mode === 'support-member'"
          :is-pending="insertMemberPending.isLoading"
          :member-option="availableSupportTeamMember"
          :purchasing-demand-id="purchasingDemandId!"
          @on-submit="
            (values, onSuccess, onError) =>
              submitSupportMemberForm(values, onSuccess, onError)
          "
        />
      </AppModal>

      <v-fab
        app
        color="green"
        :icon="iconOutline.plus"
        :loading="isActive"
        location="right bottom"
        :style="{ zIndex: 1004 }"
        @click="openModal({ title: 'Nova Demanda', mode: 'purchasing-demand' })"
      />
    </div>
  </v-container>
</template>
