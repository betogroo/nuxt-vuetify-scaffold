<script setup lang="ts">
  import type { PurchasingDemandInsert } from '~/types'
  const { showToast, handleError } = useHelpers()

  const { insertPurchasingDemand, purchasingPending } = usePurchasingDemand()

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'UGE',
    order: 2,
  })

  const submitForm = async (data: PurchasingDemandInsert) => {
    try {
      await insertPurchasingDemand(data)
      showToast('success', 'Dados inseridos com sucesso')
    } catch (error) {
      handleError(error)
    }
  }
</script>

<template>
  <div>
    <FormPurchaseDemand
      :is-pending="purchasingPending.isLoading"
      @on-submit="submitForm"
    />
  </div>
</template>
