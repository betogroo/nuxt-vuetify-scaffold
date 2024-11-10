<script setup lang="ts">
  const theme = useTheme()
  const toggleDark = () => {
    //colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
</script>

<template>
  <div>
    <v-btn @click="toggleDark">Modo</v-btn>
  </div>
</template>
