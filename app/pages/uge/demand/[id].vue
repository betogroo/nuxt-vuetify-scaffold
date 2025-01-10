<script setup lang="ts">
  const { id } = useValidateParam()
  const { demand, getPurchasingDemand, purchasing_demand_details_pending } =
    usePurchasingDemand()
  onBeforeMount(async () => {
    await getPurchasingDemand(+id!)
  })
</script>

<template>
  <div>
    <div v-if="demand">
      <h1>Processo {{ id }} - ({{ demand.description }})</h1>
      <h2>PTRES {{ demand.ptres_number }}</h2>
      <h2>Agente de Contratação: {{ demand.contracting_agent_name }}</h2>
      <h3>
        Equipe de Apoio:
        <div
          v-for="member in demand.support_team"
          :key="member.id"
        >
          {{ member.name }}
        </div>
      </h3>
      {{ demand }}
    </div>
  </div>
</template>
