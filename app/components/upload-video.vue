<script lang="ts" setup>
/*
    models
*/
const uploaded_video = ref(null);

//
</script>

<template>
  <v-card
    border
    rounded="lg"
  >
    <v-card-item>
      <v-card-title class="mb-5 text-green-accent-2">
        <h2>Upload your Video:</h2>
      </v-card-title>
      <v-card-text>
        <v-file-input
          v-model:model-value="uploaded_video"
          variant="outlined"
          prepend-inner-icon="mdi-video"
          label="upload video"
          show-size
          prepend-icon
        />
      </v-card-text>
    </v-card-item>
  </v-card>
</template>
