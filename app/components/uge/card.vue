<script setup lang="ts">
  interface Props {
    title: string
  }
  defineProps<Props>()
</script>

<template>
  <v-card variant="outlined"
    ><slot />
    <template #title>
      <v-row align="center">
        <v-col :cols="!$slots.action ? 12 : 9">{{ title }}</v-col>
        <v-col
          v-if="$slots.action"
          class="text-right"
          cols="3"
        >
          <slot name="action" />
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>
