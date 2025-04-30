<script setup lang="ts">
  import type { BallotBoxRow } from '~/types'

  interface Props {
    ballotBox: BallotBoxRow
  }
  defineProps<Props>()

  const handleNumericButton = (value: number) => {
    console.log(value)
  }
</script>

<template>
  <v-container>
    <div class="h1">Urna</div>
    <div>{{ ballotBox }}</div>
    <v-sheet>
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
    <v-sheet>
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
  </v-container>
</template>
