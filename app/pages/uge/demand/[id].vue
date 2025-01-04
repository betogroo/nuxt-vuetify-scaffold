<script setup lang="ts">
  const { fetch, profiles, availableSupportTeam } = useSupportTeamStoreStore()
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

  onMounted(async () => {
    if (id) await getPurchasingDemandById(id)
    await fetchAgents()
    await getAvailableSupportTeam(+id!)
    await getDesignedSupportTeam(+id!)
    await fetch()
  })

  const {
    id: process,
    description,
    ptres_number,
    contracting_agent,
    contracting_agent_id,
  } = detailedPurchasingRow.value

  const coisos = computed(() => {
    return availableSupportTeam(
      contracting_agent_id,
      detailedPurchasingRow.value,
    )
  })
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
        v-for="teamProfile in coisos"
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
          v-for="item in coisos"
          :key="item.id"
        >
          {{ item.name }} <v-btn @click="console.log(item.id)">+</v-btn>
        </v-list-item>
      </template>
    </h2>
    <v-divider />
  </div>
</template>
