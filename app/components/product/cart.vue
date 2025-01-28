<script setup lang="ts">
  import type { ProductName, ProductRow } from '~/types'

  const { getProductsByName, productsByName } = useProduct()

  const cartIsActive = defineModel<boolean>()
  const products = ref<ProductRow[]>([])
  const quantities = reactive<Record<string, number>>({})

  const handleSearchForm = async (data: ProductName) => {
    await getProductsByName({ name: data.name }, ['name'])
    console.log(productsByName)
  }

  const addProduct = (product: ProductRow) => {
    products.value = [...products.value, product]
  }

  const insertProductsOnDemand = async () => {
    const finalProducts = products.value.map((item) => {
      return {
        id: item.id,
        quantities: quantities[item.id],
      }
    })
    console.log(finalProducts)
  }

  onMounted(() => {
    products.value.forEach((product) => {
      quantities[product.id] = 1 // Default inicial
    })
  })
</script>

<template>
  <AppDrawer v-model="cartIsActive">
    <FormProductSearch @on-submit="(values) => handleSearchForm(values)" />
    <v-list v-if="productsByName?.length">
      <v-list-item
        v-for="product in productsByName"
        :key="product.cat_mat"
        @click="addProduct(product)"
      >
        {{ product.name }}</v-list-item
      >
    </v-list>
    <v-divider />
    <v-list v-if="products.length">
      <v-list-item
        v-for="product in products"
        :key="product.id"
      >
        <div class="d-flex align-center">
          <div>{{ product.name }}</div>
          <v-text-field
            v-model="quantities[product.id]"
            hide-details
            type="number"
            variant="outlined"
          />
        </div>
      </v-list-item>
      <v-btn @click="insertProductsOnDemand">Adicionar ao Processo</v-btn>
    </v-list>
    Carrinho
  </AppDrawer>
</template>
