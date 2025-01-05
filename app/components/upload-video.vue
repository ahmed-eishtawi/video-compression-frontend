<script lang="ts" setup>
import { uploaded_video } from "~/data";
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
        <v-card
          elevation="0"
          class="bg-transparent pa-0"
        >
          <v-card-item class="pa-0">
            <v-card-title class="text-green-accent-2">
              <h3>Upload Video</h3>
            </v-card-title>
            <v-card-subtitle class="mb-5">
              Select the video file to compress:
            </v-card-subtitle>
            <v-file-input
              v-model:model-value="uploaded_video"
              variant="outlined"
              label="upload video"
              color="green-accent-2"
              accept=".y4m, video/*"
              prepend-inner-icon="mdi-video"
              prepend-icon=""
              show-size
            />
          </v-card-item>
        </v-card>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>
