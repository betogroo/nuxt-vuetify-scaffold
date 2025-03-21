<script setup lang="ts">
  const { id } = useValidateParam()
  const { supplier, getSupplierById } = useSupplier()

  onMounted(async () => {
    try {
      if (!id) throw Error('Fornecedor ão encontrado')
      await getSupplierById(id)
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <div>{{ supplier }}</div>
</template>
