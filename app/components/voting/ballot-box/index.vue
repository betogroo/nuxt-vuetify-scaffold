<script setup lang="ts">
  import type { BallotBoxRow } from '~/types'

  interface Props {
    ballotBox: BallotBoxRow
  }
  defineProps<Props>()

  const content = ref<string[]>([])

  const handleNumericButton = (value: number) => {
    content.value.push(value.toString())
  }

  const handleReset = () => {
    content.value = []
  }
</script>

<template>
  <v-container>
    <div class="h1">Urna</div>
    <div>{{ ballotBox }}</div>
    <VotingBallotBoxNumericDisplay
      :content="content"
      :length="3"
    />
    <v-card>
      <v-sheet class="d-flex justify-center">
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="1"
          @click="(value) => handleNumericButton(value)"
        />
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="2"
          @click="(value) => handleNumericButton(value)"
        />
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="3"
          @click="(value) => handleNumericButton(value)"
        />
      </v-sheet>
      <v-sheet class="d-flex justify-center">
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="4"
          @click="(value) => handleNumericButton(value)"
        />
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="5"
          @click="(value) => handleNumericButton(value)"
        />
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="6"
          @click="(value) => handleNumericButton(value)"
        />
      </v-sheet>
      <v-sheet class="d-flex justify-center">
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="7"
          @click="(value) => handleNumericButton(value)"
        />
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="8"
          @click="(value) => handleNumericButton(value)"
        />
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="9"
          @click="(value) => handleNumericButton(value)"
        />
      </v-sheet>
      <v-sheet class="d-flex justify-center">
        <VotingBallotBoxNumericBtn
          :sound="true"
          :value="0"
          @click="(value) => handleNumericButton(value)"
        />
      </v-sheet>
      <VotingBallotBoxActionBtn @click="handleReset" />
    </v-card>
  </v-container>
</template>
