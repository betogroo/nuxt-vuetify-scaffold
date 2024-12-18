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
  </div>
</template>
