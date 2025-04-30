<script setup lang="ts">
  interface Props {
    content: string[]
    length?: number
  }
  withDefaults(defineProps<Props>(), {
    length: 3,
  })
</script>

<template>
  <v-container>
    <v-sheet class="d-flex">
      <v-sheet
        v-for="(item, i) in length"
        :key="item + i"
        border
        class="text-h4 d-flex justify-center align-center ma-1"
        height="50"
        width="50"
      >
        {{ content[i] }}
      </v-sheet>
    </v-sheet>
  </v-container>
</template>
