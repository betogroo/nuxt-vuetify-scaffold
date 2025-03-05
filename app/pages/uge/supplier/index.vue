<script setup lang="ts">
  import type { SupplierInsert } from '~/types'

  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'Fornecedores',
  })

  const submitSupplier = async (
    data: SupplierInsert,
    onSuccess: (name: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      console.log(data)
      onSuccess('Forpls')
    } catch (error) {
      onError('Impossível cadastrar o fornecedor', error)
    }
  }
</script>

<template>
  <v-container>
    <h1>Fornecedores</h1>
    <UgeFormSupplier
      @on-submit="
        (data, onSuccess, onError) => {
          submitSupplier(data, onSuccess, onError)
        }
      "
    />
  </v-container>
</template>
