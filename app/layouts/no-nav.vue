<script setup lang="ts"></script>

<template>
  <v-app>
    <v-main>
      <v-row
        align="center"
        class="fill-height"
        justify="center"
      >
        <v-col
          cols="10"
          lg="4"
          md="6"
          sm="8"
        >
          <slot />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
