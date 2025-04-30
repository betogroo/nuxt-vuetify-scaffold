<script setup lang="ts">
  interface Props {
    content: string
    length?: number
  }
  const props = withDefaults(defineProps<Props>(), {
    length: 3,
  })
  const display = computed(() => props.content.split(''))
  //const display = computed(() => props.content)
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
        {{ display[i] }}
      </v-sheet>
    </v-sheet>
  </v-container>
</template>
