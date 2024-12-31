<script setup lang="ts">
  const { params } = useRoute()
  const { getPurchasingDemandById, detailedPurchasingRow, fetchAgents } =
    useDetailedPurchasing()
  const {
    fetchAvailableSupportTeam,
    availableSupportTeamProfile,
    supportTeam,
    fetchSupportTeam,
  } = useSupportTeam()

  const id = Array.isArray(params.id) ? params.id[0] : params.id

  if (id) await getPurchasingDemandById(id)
  await fetchAgents()
  await fetchSupportTeam(+id!)
  await fetchAvailableSupportTeam(+id!)

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
    <h2>
      Equipe de Apoio:
      <v-list-item
        v-for="item in supportTeam"
        :key="item.profiles.id"
      >
        {{ item.profiles.name }}
      </v-list-item>
    </h2>
    <h2>
      Funcionários Disponíveis:
      <v-list-item
        v-for="item in availableSupportTeamProfile"
        :key="item.id"
      >
        {{ item.name }}
      </v-list-item>
    </h2>
  </div>
</template>
