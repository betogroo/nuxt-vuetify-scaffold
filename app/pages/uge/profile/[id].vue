<script setup lang="ts">
  const { id } = useValidateParam()
  const { fetchPurchasingDemandsByMember, agentWithDemands } =
    usePurchasingDemand()

  onBeforeMount(async () => {
    await fetchPurchasingDemandsByMember(id!)
  })
</script>

<template>
  <AppCard :title="agentWithDemands?.contracting_agent_name!">
    <div>{{ agentWithDemands }}</div>
  </AppCard>
</template>
