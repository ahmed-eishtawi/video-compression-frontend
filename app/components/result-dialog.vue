<script lang="ts" setup>
import { show_dialog, psnr_chart_option, bitrate_chart_option } from "~/data";
//
/*
  models
*/
//
const psnr_chart = ref(null);
const bitrate_chart = ref(null);
//
/*
  methods
*/
const downloadChart = (chartRef: any, filename: string): void => {
  if (chartRef?.getDataURL) {
    const dataURL = chartRef.getDataURL({
      type: "png",
      pixelRatio: 2,
      backgroundColor: "#fff",
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${filename}.png`;
    link.click();
  }
  //
  else {
    console.error("Chart reference is not available or invalid.");
  }
};
//
const downloadResults = (): void => {
  downloadChart(bitrate_chart.value, "bitrate_chart");
  downloadChart(psnr_chart.value, "psnr_chart");
};
//
</script>

<template>
  <v-dialog
    v-model="show_dialog"
    max-width="800"
    fullscreen
  >
    <v-card>
      <v-card-title class="my-1 d-flex align-center">
        <span class="text-green-accent-2">Video Compression Result</span>
        <v-spacer />
        <v-btn
          icon
          variant="plain"
          @click="show_dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row no-gutters>
          <v-col
            v-if="
              bitrate_chart_option &&
              bitrate_chart_option.series[0].data.length > 0 &&
              bitrate_chart_option.series[1].data.length > 0
            "
            cols="12"
            md="6"
          >
            <VChart
              ref="bitrate_chart"
              :init-options="{
                width: 'auto',
                height: '400px',
              }"
              :option="bitrate_chart_option"
            />
          </v-col>
          <!--  -->

          <v-col
            v-if="
              psnr_chart_option &&
              psnr_chart_option.series[0].data.length > 0 &&
              psnr_chart_option.series[1].data.length > 0
            "
            cols="12"
            md="6"
          >
            <VChart
              ref="psnr_chart"
              :init-options="{
                width: 'auto',
                height: '400px',
              }"
              :option="psnr_chart_option"
            />
          </v-col>
          <!--  -->

          <v-col
            v-else
            cols="12"
          >
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

      <v-card-actions>
        <v-spacer />

        <v-btn
          text="Close"
          variant="plain"
          @click="show_dialog = false"
        />

        <v-btn
          color="green-accent-2"
          text="Download"
          variant="tonal"
          @click="downloadResults"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
