<script setup lang="ts">
  import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'
  const { handleError } = useHelpers()
  const { push } = useRouter()

  const {
    insertPurchasingDemand,
    purchasingPending,
    columns,
    fetchPurchasingDemands,
    purchasingDemands,
  } = usePurchasingDemand()
  const { fetchProfiles, profiles } = useProfile()

  const purchaseDemandModal = ref(false)
  const closeModal = () => {
    purchaseDemandModal.value = false
  }
  const openModal = () => {
    purchaseDemandModal.value = true
  }

  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'UGE - Demandas',
  })

  const submitForm = async (
    data: PurchasingDemandInsert,
    onSuccess: (id: string | number) => void,
    onError: (message: string) => void,
  ) => {
    try {
      const insertedData: PurchasingDemand = await insertPurchasingDemand(data)
      if (!insertedData) throw Error('Erro ao tentar inserir a demanda')
      onSuccess(insertedData.id)
      closeModal()
      push(`/uge/demand/${insertedData.id}`)
    } catch (error) {
      onError(`Erro ao tentar inserir a demanda, ${handleError(error).message}`)
    }
  }
  const purchasingDemandsWithContractingAgent = computed(() => {
    if (!profiles.value || !purchasingDemands.value) return []
    const profileMap = new Map(
      profiles.value.map((profile) => [profile.id, profile.name]),
    )
    const returnData = purchasingDemands.value.map((demand) => ({
      ...demand,
      contracting_agent:
        profileMap.get(demand.contracting_agent_id) || 'não definido',
    }))
    return returnData
  })

  onMounted(async () => {
    try {
      await fetchPurchasingDemands(undefined, [
        'id, ptres_number',
        'description',
        'contracting_agent_id',
      ])
      await fetchProfiles(undefined, ['id', 'name'])
    } catch (error) {
      console.log(error)
    }
  })

  const selectProfileData = computed(() =>
    profiles.value.map((item) => {
      return {
        name: item.name || '',
        value: item.id,
      }
    }),
  )
</script>

<template>
  <v-container class="fill-height flex-column justify-space-between align-end">
    <div class="w-100">
      <TablePurchasingDemand
        :columns="columns"
        :rows="purchasingDemandsWithContractingAgent"
        title="Demandas"
      />
      <AppModal
        v-model="purchaseDemandModal"
        title="Cadastrar Processo"
      >
        <FormPurchaseDemand
          :is-pending="purchasingPending.isLoading"
          :select-profile-data="selectProfileData"
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
