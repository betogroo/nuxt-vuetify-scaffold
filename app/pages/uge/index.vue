<script setup lang="ts">
  import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'
  const { handleError } = useHelpers()

  const { insertPurchasingDemand, purchasingPending } = usePurchasingDemand()

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'UGE',
    order: 2,
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
    } catch (error) {
      onError(`Erro ao tentar inserir a demanda, ${handleError(error).message}`)
    }
  }
</script>

<template>
  <div>
    <FormPurchaseDemand
      :is-pending="purchasingPending.isLoading"
      @on-submit="
        (values, onSuccess, onError) => submitForm(values, onSuccess, onError)
      "
    />
  </div>
</template>
