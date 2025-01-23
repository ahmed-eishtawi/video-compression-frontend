<script setup lang="ts">
import { theme } from '~/data'

defineProps({
  member: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <v-card color="green-accent-2" variant="tonal" rounded="lg">
    <v-row no-gutters class="align-center">
      <v-col md="6" cols="12">
        <v-card-item>
          <v-card-title
            :class="theme === 'dark' ? 'text-white' : 'text-black'"
            >{{ member.name }}</v-card-title
          >
          <v-card-subtitle
            :class="theme === 'dark' ? 'text-white' : 'text-black'"
          >
            {{ member.role }}
          </v-card-subtitle>
          <v-card-text>
            <div class="mb-1">
              <h4 :class="theme === 'dark' ? 'text-white' : 'text-black'">
                Technologies:
              </h4>
            </div>
            <!--  -->

            <v-row no-gutters class="ga-1">
              <v-chip
                v-for="technology in member.technologies"
                :key="technology.text"
                :value="technology.text"
                :color="theme === 'dark' ? 'grey-lighten-1' : 'grey-darken-1'"
              >
                <template #prepend>
                  <v-icon v-if="technology.icon" class="mr-2">
                    <font-awesome :icon="technology.icon" />
                  </v-icon>
                </template>
                <span>{{ technology.text }}</span>
              </v-chip>
            </v-row>
          </v-card-text>
        </v-card-item>
      </v-col>
      <!--  -->

      <v-col md="6" cols="12">
        <v-card-item>
          <v-card
            :subtitle="'Check ' + member.name + '\'s' + ' repositories'"
            :href="member.githubURL"
            title="Follow me on GitHub"
            class="mx-auto"
            color="green-accent-2"
            max-width="350"
            append-icon="mdi-open-in-new"
            target="_blank"
            prepend-icon="mdi-github"
            rel="noopener"
          />
        </v-card-item>
      </v-col>
    </v-row>
  </v-card>
</template>
