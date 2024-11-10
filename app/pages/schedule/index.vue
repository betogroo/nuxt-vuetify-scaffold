<script setup lang="ts">
  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Horários',
    order: 3,
  })
  const { push } = useRouter()
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
            title="Professores"
            @click="push('./schedule/teacher')"
          />
        </v-col>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard
            title="Matérias"
            @click="push('./schedule/subject')"
          />
        </v-col>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard
            title="Turmas"
            @click="push('./schedule/class')"
          />
        </v-col>
        <v-col
          cols="12"
          lg="3"
          sm="6"
        >
          <AppCard
            title="Horários"
            @click="push('./schedule/schedule')"
          />
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>
