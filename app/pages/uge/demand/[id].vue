<script setup lang="ts">
  import type { DemandWithAgent } from '~/types'
  const { params } = useRoute()
  const { getPurchasingDemandById, purchasingDemand } = usePurchasingDemand()

  const { profiles, fetchProfiles } = useProfile()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  if (id) await getPurchasingDemandById(id)
  await fetchProfiles()

  const purchasingDemandWithContractingAgent = computed<DemandWithAgent>(() => {
    if (!profiles.value || !purchasingDemand.value)
      return {
        id: '',
        description: '',
        contracting_agent: '',
        contracting_agent_id: '',
      }
    const profileMap = new Map(
      profiles.value.map((profile) => [profile.id, profile.name]),
    )
    return {
      ...purchasingDemand.value,
      contracting_agent:
        profileMap.get(purchasingDemand.value.contracting_agent_id) ||
        'não definido',
    }
  })

  const {
    id: process,
    description,
    ptres_number,
    contracting_agent,
  } = purchasingDemandWithContractingAgent.value
</script>

<template>
  <div>
    <h1>Processo número {{ process }}</h1>
    <h2>Descrição {{ description }}</h2>
    <h2>PTRES {{ ptres_number }}</h2>
    <h2>Agente de Contratação {{ contracting_agent }}</h2>
  </div>
</template>
