<script setup lang="ts">
  const { params } = useRoute()
  const { getPurchasingDemandById, detailedPurchasingRow, fetchAgents } =
    useDetailedPurchasing()

  const id = Array.isArray(params.id) ? params.id[0] : params.id

  if (id) await getPurchasingDemandById(id)
  await fetchAgents()

  const {
    id: process,
    description,
    ptres_number,
    contracting_agent,
  } = detailedPurchasingRow.value
</script>

<template>
  <div>
    <h1>Processo número {{ process }}</h1>
    <h2>Descrição {{ description }}</h2>
    <h2>PTRES {{ ptres_number }}</h2>
    <h2>Agente de Contratação {{ contracting_agent }}</h2>
  </div>
</template>
