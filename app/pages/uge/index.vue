<script setup lang="ts">
  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'UGE',
    order: 2,
  })
</script>

<template>
  <div>
    <router-link to="/uge/demand">Demandas</router-link>
    <router-link to="/uge/profile">Agentes</router-link>
    <router-link to="/uge/products">Produtos</router-link>
    <router-link to="/uge/supplier">Fornecedores</router-link>
    <router-link to="/uge/products/classes">Classes</router-link>
    <router-link to="/uge/products/units">Unidades</router-link>
  </div>
</template>
