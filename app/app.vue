<script setup lang="ts">
import { theme } from '~/data/index'
//
</script>

<template>
  <v-theme-provider :theme="theme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-theme-provider>
</template>
