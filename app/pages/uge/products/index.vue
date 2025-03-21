<script setup lang="ts">
  import type { ProductInsert, ProductRow } from '~/types'

  const { push } = useRouter()
  const {
    isActive: isInsertProductModalActive,
    openModal: openInsertProductModal,
    closeModal: closeInsertProductModal,
    props: insertProductModalProps,
  } = useModal()

  const {
    products,
    fetchProducts,
    fetchPendingProducts,
    insertProduct,
    insertProductPending,
    productClasses,
    fetchProductClasses,
    productExpenseCategories,
    fetchProductExpenseCategories,
  } = useProduct()

  const submitProduct = async (
    data: ProductInsert,
    onSuccess: (id: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData: ProductRow = await insertProduct(data)
      if (!insertedData) throw Error('Erro ao tentar inserir o produto')
      onSuccess(insertedData.id)
      closeInsertProductModal()
      push(`/uge/products/${insertedData.id}`)
    } catch (error) {
      onError('Erro ao tentar inserir o produto', error)
    }
  }

  const handleInsertProductModal = async () => {
    try {
      await fetchProductClasses()
      await fetchProductExpenseCategories()
      openInsertProductModal({ title: 'Cadastrar novo Produto' })
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(async () => {
    try {
      await fetchProducts()
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <div>
    <AppModalWithFabActivator
      v-model="isInsertProductModalActive"
      :title="insertProductModalProps.title!"
      @close-modal="closeInsertProductModal"
      @open-modal="handleInsertProductModal"
    >
      <UgeFormProduct
        :is-pending="insertProductPending.isLoading"
        :product-classes-select-items="productClasses"
        :product-expense-category-select-items="productExpenseCategories"
        @on-submit="
          (values, onSuccess, onError) =>
            submitProduct(values, onSuccess, onError)
        "
      />
    </AppModalWithFabActivator>
    <UgeTableProducts
      :is-pending="fetchPendingProducts.isLoading"
      :rows="products"
      title="Produtos Cadastrados"
    />
  </div>
</template>
