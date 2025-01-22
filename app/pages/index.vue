<script lang="ts" setup>
import 'echarts'

import {
  uploaded_video,
  selected_qp,
  show_dialog,
  bitrate_chart_option,
  bitrate_h264,
  bitrate_h265,
  bitrate_differences,
  psnr_chart_option,
  psnr_h264,
  psnr_h265,
  psnr_differences,
  table_of_content,
  project_team
} from '~/data'

import type { response } from '~/types'
//
/*
  composables
*/
useHead({
  title: 'Video Compression App',
  meta: [
    {
      name: 'description',
      content: 'A video compression app using Nuxt.js and Vite'
    }
  ]
})
//
/*
  models
*/

const tab = ref('home')

const video_loading = ref(false)

const alert = ref({
  show: false,
  text: '',
  timeout: 3000,
  color: 'error'
})
//

/*
  watch
*/
watch(show_dialog, () => {
  /* reset the Table of Content values when close the result Dialog */
  if (!show_dialog.value) {
    resetData()
  }
})
//
/*
  methods
*/
const compressVideo = async () => {
  if (!uploaded_video.value) {
    alert.value.text = 'Please upload a video file'
    alert.value.color = 'error'
    alert.value.show = true
    return
  }

  if (selected_qp.value.length <= 0) {
    alert.value.text = 'Please select at least one Quantization Parameter'
    alert.value.color = 'error'
    alert.value.show = true
    return
  }
  /*  */

  video_loading.value = true

  const form_data = new FormData()

  /* sort the order of qp values, only for UX needs */
  selected_qp.value = selected_qp.value.sort((a, b) => a - b)

  form_data.append('video', uploaded_video.value)
  form_data.append('qp', JSON.stringify(selected_qp.value))

  try {
    const url =
      location.hostname == 'localhost' ||
      /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/.test(location.hostname)
        ? `http://${location.hostname}/api/upload_video`
        : 'https://ahmed-gharghar.tech/api/upload_video'

    const res: response = await $fetch(url, {
      method: 'POST',
      body: form_data
    })

    /* update the xAxis depending on the last value for selected_qp */
    bitrate_chart_option.value.xAxis.data = selected_qp.value.map((qp) => qp)
    psnr_chart_option.value.xAxis.data = selected_qp.value.map((qp) => qp)

    /* get the results */
    res.results.forEach((result) => {
      bitrate_h264.value.push(Number(result.h264.bitrate.toFixed(3)) / 1000)
      bitrate_h265.value.push(Number(result.h265.bitrate.toFixed(3)) / 1000)
      bitrate_differences.value.push(
        Number(result.differences.bitrate.toFixed(3)) / 1000
      )

      psnr_h264.value.push(Number(result.h264.psnr.toFixed(3)))
      psnr_h265.value.push(Number(result.h265.psnr.toFixed(3)))
      psnr_differences.value.push(Number(result.differences.psnr.toFixed(3)))
    })

    selected_qp.value.forEach((qp, index) => {
      table_of_content.value.push({
        QP: qp,
        'H264 bitrate (Kb/s)': bitrate_h264.value[index]?.toFixed(3),
        'H265 bitrate (Kb/s)': bitrate_h265.value[index]?.toFixed(3),
        'H264 PSNR (db)': psnr_h264.value[index]?.toFixed(3),
        'H265 PSNR (db)': psnr_h265.value[index]?.toFixed(3),
        'bitrate Difference (Kb/s)':
          bitrate_differences.value[index]?.toFixed(3),
        'PSNR Difference (db)': psnr_differences.value[index]?.toFixed(3)
      })
    })

    show_dialog.value = true

    alert.value.text = 'Video compressed successfully'
    alert.value.color = 'success'
    alert.value.show = true
    //
  } catch (error) {
    alert.value.text = 'Check your internet connection and try again'
    alert.value.color = 'error'
    alert.value.timeout = 5000
    alert.value.show = true

    console.log(error)
  } finally {
    video_loading.value = false
  }
}
//
const resetData = () => {
  bitrate_h264.value = []
  bitrate_h265.value = []
  bitrate_differences.value = []
  bitrate_chart_option.value.series[0].data = bitrate_h264.value
  bitrate_chart_option.value.series[1].data = bitrate_h265.value

  psnr_h264.value = []
  psnr_h265.value = []
  psnr_differences.value = []
  psnr_chart_option.value.series[0].data = psnr_h264.value
  psnr_chart_option.value.series[1].data = psnr_h265.value

  table_of_content.value = []
}
//
</script>

<template>
  <div>
    <v-row class="flex-column align-center ga-2" no-gutters>
      <v-col cols="12">
        <h1 class="mb-5 text-center text-green-accent-2">
          Video Compression App
        </h1>
      </v-col>
      <!--  -->

      <v-col cols="12" md="5" class="mb-2">
        <v-tabs v-model="tab" color="green-accent-2" grow>
          <v-tab value="home">
            <v-icon>mdi-home-outline</v-icon>
            <span class="ml-2">Home</span>
          </v-tab>
          <!--  -->

          <v-tab value="about">
            <v-icon>mdi-information-outline</v-icon>
            <span class="ml-2">About</span>
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col cols="12" md="8">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="home">
            <v-card class="bg-transparent pa-0">
              <v-stepper
                :items="['Upload video', 'Quantization Parameters']"
                :disabled="video_loading"
              >
                <template #item.1>
                  <upload-video />
                </template>

                <template #item.2>
                  <qp-values :disabled="video_loading" />
                  <v-btn
                    class="mt-5"
                    variant="tonal"
                    color="green-accent-2"
                    :loading="video_loading"
                    block
                    @click="compressVideo"
                  >
                    Compress Video
                  </v-btn>
                </template>
              </v-stepper>
            </v-card>
          </v-tabs-window-item>
          <!--  -->

          <!-- if statement to hide the about when we in home,  -->
          <v-tabs-window-item
            v-if="tab === 'about'"
            value="about"
            class="d-flex flex-column justify-center align-center ga-3 mb-5"
          >
            <information-card
              v-for="(member, index) in project_team"
              :key="index"
              :member="member"
            />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
    <!--  -->

    <result-dialog v-model="show_dialog" />
    <!--  -->

    <v-snackbar
      v-model="alert.show"
      :timeout="alert.timeout"
      :color="alert.color"
    >
      {{ alert.text }}

      <template #actions>
        <v-btn color="white" variant="text" icon @click="alert.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
