<script setup lang="ts">
  import type { ClassInsert } from '~/types'
  const { insertClass, insertPending, classes, fetch } = useClass()
  const { showToast, handleError } = useHelpers()

  const handleSubmit = async (data: ClassInsert) => {
    try {
      const newClass = await insertClass(data)
      if (!newClass) throw new Error('Erro ao Adicionar Turma')
      showToast('success', `Turma ${newClass.name} cadastrada com sucesso`)
    } catch (err) {
      const e = err as Error
      const error = handleError(e)
      showToast('error', error.message)
      console.error(error)
    }
  }

  onMounted(async () => {
    await fetch()
  })
</script>

<template>
  <div>
    <div>Turmas</div>
    <FormClass
      :is-pending="
        insertPending.isLoading && insertPending.action === 'add-classes'
      "
      @on-submit="handleSubmit"
    />
    <section>
      <v-list>
        <v-list-item
          v-for="item in classes"
          :key="item.id"
        >
          {{ item.name }}
        </v-list-item>
      </v-list>
    </section>
  </div>
</template>
