<script setup lang="ts">
  import type {
    TableColumn,
    OfferOnProductDemandRow,
    ProductOnDemandRow,
  } from '~/types'

  interface Props {
    id: number
    productsOnDemand: ProductOnDemandRow[]
    tableHeader: TableColumn[]
  }
  defineProps<Props>()

  const $emit = defineEmits<{
    'add-offer': [id: string]
  }>()

  const { fetchOffersOnProductDemand, offersOnProductDemand } = useOffer()

  onMounted(async () => {
    try {
      await fetchOffersOnProductDemand({}, [
        `
    purchasing_demand_product:purchasing_demand_product_id,
    supplier_id,
    offer_value,
    ...suppliers!inner(
      supplier_name:name
    )
    `,
      ])
      console.log(offersOnProductDemand)
    } catch (error) {
      console.log(error)
    }
  })

  const offersOnDemandHeaders: TableColumn[] = [
    {
      key: 'supplier_name',
      title: 'Fornecedor',
    },
    {
      key: 'offer_value',
      title: 'Valor ofertado',
    },
  ]

  const expandedRowItem = ref<OfferOnProductDemandRow[] | null>([])

  const expandRow = async (id: string) => {
    const filteredOffers: OfferOnProductDemandRow[] | null =
      offersOnProductDemand.value
        .filter((item) => item.purchasing_demand_product === id)
        .sort((a, b) => (a.offer_value ?? 0) - (b.offer_value ?? 0))
    expandedRowItem.value = filteredOffers || null
  }
</script>

<template>
  <v-data-table
    :headers="tableHeader"
    :items="productsOnDemand"
    show-expand
  >
    <template #item.price="{ value }">
      {{ formatCurrency(value, 4) }}
    </template>
    <template #item.total_price="{ value }">
      {{ formatCurrency(value) }}
    </template>

    <template #item.actions="{ item, isExpanded, internalItem, toggleExpand }">
      <div class="d-flex align-center">
        <v-btn
          color="red"
          density="compact"
          :icon="iconOutline.plus"
          variant="text"
          @click="$emit('add-offer', item.id)"
        />
        <v-btn
          :append-icon="
            isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'
          "
          density="compact"
          size="small"
          variant="outlined"
          @click="
            toggleExpand(internalItem), $nextTick(() => expandRow(item.id))
          "
          >Ofertas</v-btn
        >
      </div>
    </template>
    <template #item.offer_total_value> offer total </template>
    <template #item.data-table-expand />
    <template #expanded-row="{ columns }">
      <tr>
        <td
          class="py-2"
          :colspan="columns.length"
        >
          <v-data-table
            v-if="expandedRowItem"
            color="red"
            density="compact"
            disable-sort
            :headers="offersOnDemandHeaders"
            hide-default-footer
            :items="expandedRowItem"
          />
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
