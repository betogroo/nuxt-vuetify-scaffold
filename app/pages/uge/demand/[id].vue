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
    <AppCard
      v-if="demand"
      :loading="purchasing_demand_details_pending.isLoading"
      :subtitle="`PTRES ${demand.ptres_number}`"
      :title="`Processo ${demand.id} - (${demand.description})`"
    >
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
    </AppCard>
  </div>
</template>
