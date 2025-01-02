<script setup lang="ts">
  const { params } = useRoute()
  const { getPurchasingDemandById, detailedPurchasingRow, fetchAgents } =
    useDetailedPurchasing()
  const {
    getAvailableSupportTeam,
    getDesignedSupportTeam,
    availableSupportTeamProfile,
    designedSupportTeamProfile,

    isPending: supportTeamIsPending,
  } = useSupportTeam()

  const id = Array.isArray(params.id) ? params.id[0] : params.id

  if (id) await getPurchasingDemandById(id)
  await fetchAgents()
  await getAvailableSupportTeam(+id!)
  await getDesignedSupportTeam(+id!)

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
        v-for="teamProfile in designedSupportTeamProfile"
        :key="teamProfile.id"
      >
        {{ teamProfile.name }}
      </v-list-item>
    </h2>
    <h2>
      Funcionários Disponíveis:
      <template
        v-if="supportTeamIsPending.action === 'get-available-support_team'"
        >Loading
      </template>
      <template v-else>
        <v-list-item
          v-for="item in availableSupportTeamProfile"
          :key="item.id"
        >
          {{ item.name }}
        </v-list-item>
      </template>
    </h2>
  </div>
</template>
