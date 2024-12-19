<script setup lang="ts">
  import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'
  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'UGE - Demandas',
  })
  const { push } = useRouter()

  const { insertPurchasingDemand, purchasingPending } = usePurchasingDemand()
  const {
    fetchPurchasingDemands,
    detailedPurchasingRows,
    agents,
    fetchAgents,
    tableColumns,
  } = useDetailedPurchasing()

  const purchaseDemandModal = ref(false)
  const closeModal = () => {
    purchaseDemandModal.value = false
  }
  const openModal = () => {
    purchaseDemandModal.value = true
  }

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
    try {
      await fetchPurchasingDemands(undefined, [
        'id, ptres_number',
        'description',
        'contracting_agent_id',
      ])
      await fetchAgents(undefined, ['id', 'name'])
    } catch (error) {
      console.log(error)
    }
  })
</script>

<template>
  <v-container class="fill-height flex-column justify-space-between align-end">
    <div class="w-100">
      <TablePurchasingDemand
        :columns="tableColumns"
        :rows="detailedPurchasingRows"
        title="Demandas"
      />
      <AppModal
        v-model="purchaseDemandModal"
        title="Cadastrar Processo"
      >
        <FormPurchaseDemand
          :is-pending="purchasingPending.isLoading"
          :select-profile-data="agents"
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
