<script setup lang="ts">
  import type { TableColumn } from '~/types'

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'UGE',
    order: 2,
  })

  const { fetchPurchasingDemands, purchasingDemands } = usePurchasingDemand()
  const { fetchProfiles, profiles } = useProfile()
  onMounted(async () => {
    try {
      await fetchPurchasingDemands(undefined, [
        'id, ptres_number',
        'description',
        'contracting_agent_id',
      ])
      await fetchProfiles(undefined, ['id', 'name'])
      console.log(purchasingDemands.value)
    } catch (error) {
      console.log(error)
    }
  })

  const purchasingDemandsWithContractingAgent = computed(() => {
    if (!profiles.value || !purchasingDemands.value) return []
    const profileMap = new Map(
      profiles.value.map((profile) => [profile.id, profile.name]),
    )
    const returnData = purchasingDemands.value.map((demand) => ({
      ...demand,
      contracting_agent:
        profileMap.get(demand.contracting_agent_id) || 'não definido',
    }))
    return returnData
  })

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'Processo',
    },
    {
      key: 'ptres_number',
      title: 'PTRES',
    },
    {
      key: 'description',
      title: 'Descrição',
    },
    {
      key: 'contracting_agent',
      title: 'Agente de Contratação',
    },
    {
      title: 'Equipe de apoio',
    },
  ]
</script>

<template>
  <div>
    <TablePurchasingDemand
      :columns="columns"
      :rows="purchasingDemandsWithContractingAgent"
      title="Demandas"
    />
  </div>
</template>
