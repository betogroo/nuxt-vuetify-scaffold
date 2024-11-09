<script setup lang="ts">
  const imgSrc = new URL('~/assets/img/404.png', import.meta.url).href
  definePageMeta({
    showInNavBar: false,
    requiresAuth: false,
    title: '404 - Not Found',
    layout: 'no-nav',
  })
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
      <div class="text-h6 text-high-emphasis">Oooops! Algo deu errado</div>
    </template>

    <template #text>
      <div class="text-body-1 text-justify">
        A chave se quebrou e a página não foi encontrada.
        <app-link
          label=" clique para retornar"
          to="/"
        />
      </div>
    </template>
  </v-empty-state>
</template>
