<script lang="ts" setup>
import {
  show_dialog,
  psnr_chart_option,
  bitrate_chart_option,
  table_of_content
} from '~/data'

import * as XLSX from 'xlsx'
//
/*
  models
*/
//
const psnr_chart = ref(null)
const bitrate_chart = ref(null)
//
/*
  methods
*/
const downloadExcel = (): void => {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(table_of_content.value)
  XLSX.utils.book_append_sheet(wb, ws, 'Comparison Table')
  XLSX.writeFile(wb, 'comparison_table.xlsx')
}
//
const downloadChart = (chartRef: any, filename: string): void => {
  if (chartRef?.getDataURL) {
    const dataURL = chartRef.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    const link = document.createElement('a')
    link.href = dataURL
    link.download = `${filename}.png`
    link.click()
  }
  //
  else {
    console.error('Chart reference is not available or invalid.')
  }
}
//
const downloadResults = (): void => {
  downloadChart(bitrate_chart.value, 'bitrate_chart')
  downloadChart(psnr_chart.value, 'psnr_chart')
  downloadExcel()
}
//
</script>

<template>
  <v-dialog v-model="show_dialog" fullscreen>
    <v-card>
      <v-card-title
        class="d-flex flex-column flex-md-row align-stretch align-md-center my-2 ga-1 ga-md-0"
      >
        <span class="text-green-accent-2">Video Compression Result</span>

        <v-spacer />

        <v-btn
          color="green-accent-2"
          text="Download"
          variant="tonal"
          class="mr-0 mr-md-2"
          @click="downloadResults"
        />

        <v-btn
          text="Close"
          append-icon="mdi-close"
          color="error"
          variant="plain"
          @click="show_dialog = false"
        />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row
          v-if="
            bitrate_chart_option.series[0].data.length > 0 &&
            bitrate_chart_option.series[1].data.length > 0 &&
            psnr_chart_option.series[0].data.length > 0 &&
            psnr_chart_option.series[1].data.length > 0
          "
          no-gutters
          justify="space-between"
        >
          <v-col cols="12" md="5">
            <ClientOnly>
              <VChart
                ref="bitrate_chart"
                :init-options="{
                  width: 'auto',
                  height: '350px'
                }"
                :option="bitrate_chart_option"
              />
            </ClientOnly>
          </v-col>
          <!--  -->

          <v-divider v-if="$vuetify.display.mdAndUp" vertical thickness="2" />

          <v-col cols="12" md="5">
            <ClientOnly>
              <VChart
                ref="psnr_chart"
                :init-options="{
                  width: 'auto',
                  height: '350px'
                }"
                :option="psnr_chart_option"
              />
            </ClientOnly>
          </v-col>
          <!--  -->

          <v-divider class="mb-3" thickness="2" />
          <!--  -->

          <v-row justify="center" class="ga-2 ga-md-0">
            <v-col cols="12" md="2">
              <h2 class="text-green-accent-2">Comparison Table:</h2>
            </v-col>
            <v-col cols="12" md="10" align-self="center">
              <v-card border>
                <v-data-table
                  hide-default-footer
                  hover
                  :items="table_of_content"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-row>
        <!--  -->

        <v-row v-else no-gutters>
          <v-col cols="12">
            <v-alert
              class="w-50 mx-auto"
              outlined
              color="info"
              icon="mdi-alert"
            >
              No data available for the charts.
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <!-- <v-card-actions>
        <v-spacer />

        <v-btn text="Close" variant="plain" @click="show_dialog = false" />

        <v-btn
          color="green-accent-2"
          text="Download"
          variant="tonal"
          @click="downloadResults"
        />
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>
