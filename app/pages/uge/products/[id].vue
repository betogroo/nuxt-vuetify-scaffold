<script setup lang="ts">
  const id = useValidateParam().id

  const { product, units, unitsPending, getProduct, getUnits, productPending } =
    useProduct()
  onMounted(async () => {
    if (id) {
      await getProduct(id)
      await getUnits(id)
    }
  })
</script>

<template>
  <v-container>
    <div v-if="!productPending.isLoading && !unitsPending.isLoading && product">
      <h1>{{ product?.name }}({{ product.cat_mat }})</h1>
      <h2>Cadastrado em {{ timestampToDate(product.created_at) }}</h2>
      <h3>Classe de Materiais: {{ product.product_class_id }}</h3>
      <h3>Natureza da Despesa BEC: {{ product.expense_category_id }}</h3>
      <h3>
        <NuxtLink
          :to="`https://www.bec.sp.gov.br/BEC_Catalogo_ui/CatalogDetalheNovo.aspx?chave=&cod_id=${product.bec_number}`"
          >Número BEC: {{ product.bec_number }}</NuxtLink
        >
      </h3>
      <v-list
        density="compact"
        lines="two"
        variant="text"
      >
        <v-list-subheader>Unidades de Fornecimento</v-list-subheader>
        <v-list-item
          v-for="unit in units"
          :key="unit.unit_id"
          :subtitle="unit.name_bec"
          :title="unit.name"
        />
      </v-list>
    </div>
    <div v-else>Carregando</div>
  </v-container>
</template>
