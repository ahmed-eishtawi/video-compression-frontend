<script setup lang="ts">
import { valid_qp_values , selected_qp } from "~/data/";

/*
    methods
*/
const handleSelectQP = (qp: number) => {
  if (selected_qp.value.includes(qp)) {
    selected_qp.value = selected_qp.value.filter((value) => value !== qp);
  }
  //
  else {
    selected_qp.value.push(qp);
  }
};
//
</script>

<template>
  <v-card
    border
    rounded="lg"
  >
    <v-card-item>
      <v-card-title class="text-green-accent-2">
        <h2>Quantization Parameters:</h2>
      </v-card-title>

      <v-card-subtitle>
        Select the Quantization Parameters (QP) to use for compression:
      </v-card-subtitle>

      <v-card-text class="d-flex flex-wrap ga-2 pa-1">
        <v-btn
          v-for="qp in valid_qp_values"
          :key="qp"
          variant="tonal"
          :color="selected_qp.includes(qp) ? 'green-accent-2' : 'white'"
          :disabled="selected_qp.length === 5 && !selected_qp.includes(qp)"
          icon
          @click="handleSelectQP(qp)"
        >
          {{ qp }}
        </v-btn>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>
