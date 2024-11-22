<script setup lang="ts">
  import type { TeacherRow } from '~/types'

  interface Props {
    teacher: TeacherRow | null
    isPending: boolean
  }
  defineProps<Props>()
</script>

<template>
  <v-container>
    <h1>{{ teacher?.name }}</h1>
  </v-container>
</template>
