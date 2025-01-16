<script setup lang="ts">
  import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'
  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'UGE - Demandas',
  })
  const { push } = useRouter()

  /* const purchaseDemandModal = ref(false)
  const closeModal = () => {
    purchaseDemandModal.value = false
  }
  const openModal = () => {
    purchaseDemandModal.value = true
  } */

  const { props, isActive, openModal, closeModal } = useModal()

  const {
    fetchPurchasingDemandRows,
    demandTableColumns,
    demands,
    purchasing_demand_details_pending,
    insertPurchasingDemand,
  } = usePurchasingDemand()

  const { members, fetchMembers } = useMemberTeam()

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

  const purchasing_demand_id = ref<number | string>('')

  const submitSupportMembers = (id: string | number) => {
    openModal({ title: 'Novo Membro na Equipe', mode: 'support-member' })
    purchasing_demand_id.value = id
  }

  onMounted(async () => {
    await fetchPurchasingDemandRows()
    await fetchMembers(undefined, ['id, name'])
  })
</script>

<template>
  <v-container class="fill-height flex-column justify-space-between align-end">
    {{ props }}
    <v-btn @click="openModal({ title: 'AAA', mode: 'aaa' })">Teste</v-btn>
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
        @add-member="submitSupportMembers"
      />
      <AppModal
        v-model="isActive"
        :title="props.title"
      >
        <FormPurchaseDemand
          v-if="props.mode === 'purchasing-demand'"
          :member-option="members"
          @on-submit="
            (values, onSuccess, onError) =>
              submitDemandForm(values, onSuccess, onError)
          "
        />
        <div v-if="props.mode === 'support-member'">
          Vai adicionar membros na demanda {{ purchasing_demand_id }}
        </div>
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
