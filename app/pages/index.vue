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
  table_of_content
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
const video_loading = ref(false)

const alert = ref({
  show: false,
  text: '',
  timeout: 3000,
  color: 'error'
})
//

/*
  watchEffect
*/
watch(show_dialog, () => {
  /* reset the Table of Content values when close the result Dialog */
  if (!show_dialog.value) {
    table_of_content.value = []
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

  form_data.append('video', uploaded_video.value)
  form_data.append('qp', JSON.stringify(selected_qp.value))

  try {
    const res: response = await $fetch(
      'https://ahmed-gharghar.tech/api/upload_video',
      {
        method: 'POST',
        body: form_data
      }
    )

    /* update the xAxis depending on the last value for selected_qp */
    bitrate_chart_option.value.xAxis.data = selected_qp.value.map((qp) => qp)
    psnr_chart_option.value.xAxis.data = selected_qp.value.map((qp) => qp)

    /* get the results */
    res.results.forEach((result) => {
      bitrate_h264.value.push(result.h264.bitrate / 1000)
      bitrate_h265.value.push(result.h265.bitrate / 1000)
      bitrate_differences.value.push(result.differences.bitrate / 1000)

      psnr_h264.value.push(result.h264.psnr)
      psnr_h265.value.push(result.h265.psnr)
      psnr_differences.value.push(result.differences.psnr)
    })

    selected_qp.value.forEach((qp, index) => {
      table_of_content.value.push({
        QP: qp,
        'H264 bitrate': bitrate_h264.value[index],
        'H265 bitrate': bitrate_h265.value[index],
        'H264 PSNR': psnr_h264.value[index],
        'H265 PSNR': psnr_h265.value[index],
        'bitrate Difference': bitrate_differences.value[index],
        'PSNR Difference': psnr_differences.value[index]
      })
    })

    show_dialog.value = true

    alert.value.text = 'Video compressed successfully'
    alert.value.color = 'success'
    alert.value.show = true
    //
  } catch (error) {
    console.log(error)
  } finally {
    video_loading.value = false
  }
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

      <v-col cols="12" md="6">
        <v-card class="bg-transparent pa-0">
          <v-stepper
            :items="['Upload video', 'Quantization Parameters']"
            :disabled="video_loading"
          >
            <template #item.1>
              <upload-video />
            </template>

            <template #item.2>
              <qp-values />
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
