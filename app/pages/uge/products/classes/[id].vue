<script setup lang="ts">
  import type { ProductClassUpdate } from '~/types'

  const { id } = useValidateParam()
  const {
    productClass,
    getProductClass,
    updateProductClass,
    updateProductClassPending,
  } = useProductClasses()

  const submitForm = async (
    values: ProductClassUpdate,
    onSuccess: () => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    console.log(id, values)
    try {
      if (!id) throw Error('Número de classe inválido')
      await updateProductClass(id, values)
      await getProductClass(id)
      onSuccess()
    } catch (error) {
      onError('Erro ao tentar editar a classe', error)
    }
  }

  try {
    await getProductClass(+id!)
  } catch (error) {
    console.log(error)
  }
</script>

<template>
  <v-container>
    <div v-if="productClass">
      <h1>{{ productClass.id }}</h1>

      <UgeFormProductClassUpdate
        :key="productClass.name"
        :initial-values="{ name: productClass.name }"
        :is-pending="updateProductClassPending.isLoading"
        @on-submit="
          (values, onSuccess, onError) => submitForm(values, onSuccess, onError)
        "
      />

      <h3>Aqui posso listar os produtos desta classe</h3>
      <h3>Também posso adicionar um link para add o produto nesta classe</h3>
    </div>
  </v-container>
</template>
