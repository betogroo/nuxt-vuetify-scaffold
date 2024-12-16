<script setup lang="ts">
  import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'
  const { handleError } = useHelpers()

  const { insertPurchasingDemand, purchasingPending } = usePurchasingDemand()
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
    } catch (error) {
      onError(`Erro ao tentar inserir a demanda, ${handleError(error).message}`)
    }
  }

  await fetchProfiles()
  const selectProfileData = profiles.value.map((item) => {
    return {
      name: item.name || '',
      value: item.id,
    }
  })
</script>

<template>
  <v-container class="fill-height flex-column justify-space-between align-end">
    <div class="w-100">
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
      @click="openModal"
    />
  </v-container>
</template>
