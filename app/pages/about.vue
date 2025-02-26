<script setup lang="ts">
  import { version as vuetifyVersion } from 'vuetify'
  import { version as vueVersion } from 'vue'
  definePageMeta({
    showInNavBar: true,
    requiresAuth: false,
    title: 'About',
    order: 1,
  })

  const { counter } = useCounterStore()

  const openModal = () => {
    console.log('Make a open modal composable')
  }
</script>

<template>
  <div>
    <section>
      <AppCard title="About">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
          recusandae atque ratione magnam, deleniti distinctio expedita, dolorum
          ab explicabo eum ut reprehenderit quaerat consequuntur animi sunt,
          odio laboriosam temporibus! Sint!
        </p>
      </AppCard>
    </section>
    <section>
      <AppCard title="Pinia">
        <p>
          Caso possa ver o número
          <span
            v-if="counter.display > 0"
            class="text-h6 font-weight-bold"
            >{{ counter.display }}</span
          >
          significa que o Pinia está funcionando, já que manteve o valor mesmo
          trocando de página. Retorne para o
          <app-link
            label="/counter"
            to="modules/counter"
          />
          e confirme se éo mesmo número.
        </p>
      </AppCard>
    </section>
    <section>
      <h1 class="page-title">Teste Modal</h1>
      <v-btn
        text="Abrir Modal"
        @click="openModal"
      />
    </section>
    <section>
      <h1 class="page-title">Versões</h1>
      <h6>Vuetify: {{ vuetifyVersion }}</h6>
      <h6>Vue: {{ vueVersion }}</h6>
    </section>
  </div>
</template>
