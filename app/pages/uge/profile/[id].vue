<script setup lang="ts">
  const { id } = useValidateParam()
  const { fetchPurchasingDemandsByMember, agentWithDemands, title, subtitle } =
    usePurchasingDemand()

  await fetchPurchasingDemandsByMember(id!)

  const demands = computed(() => agentWithDemands.value?.purchasing_demands)
</script>

<template>
  <AppCard :title="agentWithDemands?.contracting_agent_name!">
    <v-container>
      <v-row>
        <v-col
          v-for="demand in demands"
          :key="demand.id"
          cols="12"
          lg="3"
          sm="6"
        >
          <v-card
            :subtitle="subtitle(demand.id, demand.created_at!)"
            :title="title(demand.description, demand.ptres_number)"
            variant="outlined"
            >Teste</v-card
          >
        </v-col>
      </v-row>
    </v-container>

    {{ demands }}
  </AppCard>
</template>
