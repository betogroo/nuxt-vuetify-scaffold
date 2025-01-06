<script setup lang="ts">
  const { id } = useValidateParam()
  const { getPurchasingDemandById, purchasingDemandDetails } =
    usePurchasingDemand()

  await getPurchasingDemandById(id!)
</script>

<template>
  <div>
    <div>Aqui nemanda numero {{ id }}</div>
    <div>{{ purchasingDemandDetails }}</div>
  </div>
</template>
