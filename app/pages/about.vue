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
  const {
    openModal: openTestModal,
    closeModal: closeTestModal,
    isActive: isTestModalActive,
    props: testModalProps,
  } = useModal()

  const openModalOne = (mode: string) => {
    openTestModal({ title: 'Modal de Teste', mode })
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
      <AppCard
        subtitle="Usando  o mesmo modal para dois assuntos distintos"
        title="Modal"
      >
        <div class="d-flex justify-center mb-4">
          <v-btn
            text="Abrir Modal Um"
            @click="openModalOne('modal-one')"
          />
          <v-btn
            class="ml-2"
            text="Abrir Modal Dois"
            @click="openModalOne('modal-two')"
          />
        </div>
        <code> {{ testModalProps }} </code>
      </AppCard>
      <AppModal
        v-model="isTestModalActive"
        :title="`${testModalProps.title} - (${testModalProps.mode})`"
        @on-close="closeTestModal"
      >
        <v-container>
          <div v-if="testModalProps.mode === 'modal-one'">
            <h4>Conteúdo do Modal Um</h4>
          </div>
          <div v-if="testModalProps.mode === 'modal-two'">
            <h4>Conteúdo do Modal Dois</h4>
          </div>
          <code> {{ testModalProps }} </code>
        </v-container>
      </AppModal>
    </section>
    <section>
      <h1 class="page-title">Versões</h1>
      <h6>Vuetify: {{ vuetifyVersion }}</h6>
      <h6>Vue: {{ vueVersion }}</h6>
    </section>
  </div>
</template>
