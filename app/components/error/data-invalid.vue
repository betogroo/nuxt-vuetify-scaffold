<script setup lang="ts">
  interface Props {
    title?: string
    message?: string
  }
  withDefaults(defineProps<Props>(), {
    title: ' Algo deu errado',
    message: 'Algo eu errado e os dados não foram carregados',
  })
  const imgSrc = new URL('~/assets/img/data-invalid.png', import.meta.url).href
</script>

<template>
  <v-empty-state
    :image="imgSrc"
    size="300"
    text-width="350"
  >
    <template #media>
      <v-img class="mb-8" />
    </template>

    <template #title>
      <div class="text-h6 text-high-emphasis">{{ title }}</div>
    </template>

    <template #text>
      <div class="text-body-1 text-justify">
        {{ message }}
        <app-link
          label=" clique para retornar"
          to="/"
        />
      </div>
    </template>
  </v-empty-state>
</template>
