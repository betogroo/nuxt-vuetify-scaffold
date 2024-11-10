<script setup lang="ts">
  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'IIRGD',
    order: 5,
  })
  const $router = useRouter()
</script>

<template>
  <v-container>
    <section>
      <h1 class="mb-4">Dashboard</h1>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard
            title="RGs"
            @click="$router.push('/iirgd/rg')"
            >Aqui</AppCard
          >
        </v-col>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard title="Antecedentes">Aqui</AppCard>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>
