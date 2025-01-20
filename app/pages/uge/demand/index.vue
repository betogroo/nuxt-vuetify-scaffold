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
    fetchPurchasingDemandRows,
    demandTableColumns,
    demands,
    purchasing_demand_details_pending,
    insertPurchasingDemand,
    purchasingInsertPending,
  } = usePurchasingDemand()
  const {
    members,
    fetchMembers,
    getAvailableSupportTeam,
    availableSupportTeamMember,
    insertMember,
    insertMemberPending,
    deleteMember: _deleteMember,
  } = useMemberTeam()

  const submitDemandForm = async (
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

  const addSupportMemberForm = async (id: number) => {
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
      const insertedData = await insertMember(data)
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
      <TablePurchasingDemand
        :columns="demandTableColumns"
        :is-pending="
          purchasing_demand_details_pending.isLoading &&
          purchasing_demand_details_pending.action ===
            'fetch-purchasing-demand-details'
        "
        :rows="demands"
        title="Demandas"
        @add-member="addSupportMemberForm"
        @delete-member="deleteMember"
      />
      <AppModal
        v-model="isActive"
        :title="props.title"
      >
        <FormPurchaseDemand
          v-if="props.mode === 'purchasing-demand'"
          :is-pending="purchasingInsertPending.isLoading"
          :member-option="members"
          @on-submit="
            (values, onSuccess, onError) =>
              submitDemandForm(values, onSuccess, onError)
          "
        />
        <FormSupportTeam
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
    </div>

    <v-fab
      absolute
      class="mr-4"
      color="green"
      :icon="iconOutline.plus"
      :loading="isActive"
      @click="openModal({ title: 'Nova Demanda', mode: 'purchasing-demand' })"
    />
  </v-container>
</template>
