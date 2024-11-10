<script setup lang="ts"></script>

<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container
        class="pa-0"
        max-width="960"
      >
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
