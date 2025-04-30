<script setup lang="ts">
  interface Props {
    value: number
    sound?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    sound: false,
  })
  const $emit = defineEmits<{ click: [value: number] }>()

  const { play: clickSound } = useSound('/sounds/ballot-box/key.wav', {
    volume: 0.5,
  })
  const handleClick = () => {
    if (props.sound) clickSound()
    $emit('click', props.value)
  }
</script>

<template>
  <v-btn
    class="ma-1"
    density="comfortable"
    :ripple="false"
    size="x-small"
    stacked
    @click.prevent="handleClick()"
  >
    <template #default>
      <div class="text-h4">{{ value }}</div>
    </template>
  </v-btn>
</template>
