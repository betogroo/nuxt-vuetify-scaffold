<script setup lang="ts">
  import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'
  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'UGE - Demandas',
  })
  const { push } = useRouter()

  const purchaseDemandModal = ref(false)
  const closeModal = () => {
    purchaseDemandModal.value = false
  }
  const openModal = () => {
    purchaseDemandModal.value = true
  }

  const {
    fetchPurchasingDemandRows,
    demandTableColumns,
    demands,
    purchasing_demand_details_pending,
    insertPurchasingDemand,
  } = usePurchasingDemand()

  const { members, fetchMembers } = useMemberTeam()

  const submitForm = async (
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

  onMounted(async () => {
    await fetchPurchasingDemandRows()
    await fetchMembers(undefined, ['id, name'])
  })
</script>

<template>
  <v-container class="fill-height flex-column justify-space-between align-end">
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
      />
      <AppModal
        v-model="purchaseDemandModal"
        title="Cadastrar Processo"
      >
        <FormPurchaseDemand
          :member-option="members"
          @on-submit="
            (values, onSuccess, onError) =>
              submitForm(values, onSuccess, onError)
          "
        />
      </AppModal>
    </div>
    <v-fab
      absolute
      class="mr-4"
      color="green"
      :icon="iconOutline.plus"
      :loading="purchaseDemandModal"
      @click="openModal"
    />
  </v-container>
</template>
