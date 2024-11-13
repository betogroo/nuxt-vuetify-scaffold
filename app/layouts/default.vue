<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <v-container
        class="pa-0"
        max-width="1080"
      >
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
