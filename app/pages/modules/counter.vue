<script setup lang="ts">
  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Contador',
    order: 2,
  })

  const { counter } = useCounterStore()
</script>

<template>
  <v-container
    class="bg-blue-grey-lighten-4 d-flex flex-column border-dashed rounded-xl mt-2"
  >
    <div class="text-h2 mx-auto">{{ counter.display }}</div>
    <div
      class="d-flex justify-center ma-2"
      style="gap: 8px"
    >
      <v-btn
        color="red"
        :disabled="counter.isDisabled"
        icon
        variant="outlined"
        @click="counter.decrease"
        ><v-icon>{{ iconOutline.minus }}</v-icon>
      </v-btn>
      <v-btn
        color="success"
        :icon="iconOutline.plus"
        variant="outlined"
        @click="counter.increase"
      />
    </div>
    <div class="d-flex flex-column px-2">
      <v-btn
        block
        color="red"
        :disabled="counter.isDisabled"
        @click="counter.$reset"
        >Reset</v-btn
      >
      <div class="text-justify mt-4">
        Vá para
        <app-link
          label="/about"
          to="/about"
        />
        para testar o funcionamento do Pinia
      </div>
    </div>
  </v-container>
</template>
