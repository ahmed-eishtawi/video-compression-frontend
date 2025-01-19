import type { member } from '~/types'

export const uploaded_video = ref(null)

export const valid_qp_values = ref<number[]>(
  Array.from({ length: 52 }, (_, i) => i)
)

export const selected_qp = ref<number[]>([])

export const show_dialog = ref<boolean>(false)

export const bitrate_h264 = ref<number[]>([])
export const bitrate_h265 = ref<number[]>([])
export const bitrate_differences = ref<number[]>([])
export const psnr_h264 = ref<number[]>([])
export const psnr_h265 = ref<number[]>([])
export const psnr_differences = ref<number[]>([])

export const table_of_content = ref<any>([])

export const bitrate_chart_option = ref({
  title: {
    text: 'Bitrate Chart'
  },
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    feature: {
      saveAsImage: {
        backgroundColor: 'transparent'
      }
    }
  },
  legend: {
    data: ['H264', 'H265']
  },
  xAxis: {
    type: 'category',
    name: 'QP',
    data: selected_qp.value
  },
  yAxis: {
    type: 'value',
    name: 'Bitrate Kb/s values'
  },
  dataset: [
    {
      source: selected_qp.value.map((qp, index) => [
        qp,
        bitrate_differences.value[index]
      ])
    }
  ],
  series: [
    {
      name: 'H264',
      stack: 'H264',
      data: bitrate_h264.value,
      type: 'line',
      label: {
        show: true,
        position: 'top',
        color: 'white'
      },
      lineStyle: {
        width: 3
      }
    },
    {
      name: 'H265',
      stack: 'H265',
      data: bitrate_h265.value,
      type: 'line',
      label: {
        show: true,
        position: 'top',
        color: 'white'
      }
    }
  ]
})

export const psnr_chart_option = ref({
  title: {
    text: 'PSNR Chart'
  },
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  legend: {
    data: ['H264', 'H265']
  },
  xAxis: {
    type: 'category',
    name: 'QP',
    data: selected_qp.value
  },
  yAxis: {
    type: 'value',
    name: 'PSNR values'
  },
  dataset: [
    {
      source: selected_qp.value.map((qp, index) => [
        qp,
        psnr_differences.value[index]
      ])
    }
  ],
  series: [
    {
      name: 'H264',
      stack: 'H264',
      data: psnr_h264.value,
      type: 'line',
      label: {
        show: true,
        position: 'top',
        color: 'white'
      },
      lineStyle: {
        width: 3
      }
    },
    {
      name: 'H265',
      stack: 'H265',
      data: psnr_h265.value,
      type: 'line',
      label: {
        show: true,
        position: 'top',
        color: 'white'
      }
    }
  ]
})
/* about the team */

export const project_team = ref<member[]>([
  {
    name: 'Ahmed Gharghar',
    role: 'Full Stack Developer',
    technologies: [
      {
        text: 'HTML',
        icon: 'fa-brands fa-html5'
      },
      {
        text: 'CSS',
        icon: 'fa-brands fa-css3-alt'
      },
      {
        text: 'JavaScript',
        icon: 'fa-brands fa-js'
      },
      {
        text: 'Vue',
        icon: 'fa-brands fa-vuejs'
      },
      {
        text: 'Nuxt 3',
        icon: ''
      },
      {
        text: 'Node.js',
        icon: 'fa-brands fa-node-js'
      },
      {
        text: 'Python',
        icon: 'fa-brands fa-python'
      },
      {
        text: 'Java',
        icon: 'fa-brands fa-java'
      },
      {
        text: 'Docker',
        icon: 'fa-brands fa-docker'
      },
      {
        text: 'AWS',
        icon: 'fa-brands fa-aws'
      },
      {
        text: 'Git',
        icon: 'fa-brands fa-git'
      },
      {
        text: 'Github',
        icon: 'fa-brands fa-github'
      }
    ],
    githubURL: 'https://github.com/ahmed-eishtawi'
  },
  {
    name: 'Ahmed Abusoba',
    role: 'Backend Developer',
    technologies: [
      {
        text: 'HTML',
        icon: 'fa-brands fa-html5'
      },
      {
        text: 'CSS',
        icon: 'fa-brands fa-css3-alt'
      },
      {
        text: 'JavaScript',
        icon: 'fa-brands fa-js'
      },
      {
        text: 'Vue',
        icon: 'fa-brands fa-vuejs'
      },
      {
        text: 'Python',
        icon: 'fa-brands fa-python'
      },
      {
        text: 'Java',
        icon: 'fa-brands fa-java'
      },
      {
        text: 'Wordpress',
        icon: 'fa-brands fa-wordpress'
      },
      {
        text: 'Laravel',
        icon: 'fa-brands fa-laravel'
      },
      {
        text: 'Git',
        icon: 'fa-brands fa-git'
      },
      {
        text: 'Github',
        icon: 'fa-brands fa-github'
      }
    ],
    githubURL: 'https://github.com/aabusoba'
  },
  {
    name: 'Kareem Edres',
    role: 'Frontend Developer',
    technologies: [
      {
        text: 'HTML',
        icon: 'fa-brands fa-html5'
      },
      {
        text: 'CSS',
        icon: 'fa-brands fa-css3-alt'
      },
      {
        text: 'JavaScript',
        icon: 'fa-brands fa-js'
      },
      {
        text: 'Node.js',
        icon: 'fa-brands fa-node-js'
      },
      {
        text: 'Python',
        icon: 'fa-brands fa-python'
      },
      {
        text: 'Java',
        icon: 'fa-brands fa-java'
      },
      {
        text: 'Flutter',
        icon: 'fa-brands fa-flutter'
      },
      {
        text: 'Git',
        icon: 'fa-brands fa-git'
      },
      {
        text: 'Github',
        icon: 'fa-brands fa-github'
      }
    ],
    githubURL: 'https://github.com/karemed'
  },
  {
    name: 'Abdulaziz Fhid',
    role: 'Desktop Developer',
    technologies: [
      {
        text: 'C sharp',
        icon: ''
      },
      {
        text: 'Python',
        icon: 'fa-brands fa-python'
      },
      {
        text: 'Java',
        icon: 'fa-brands fa-java'
      },
      {
        text: 'Wordpress',
        icon: 'fa-brands fa-wordpress'
      },
      {
        text: 'Git',
        icon: 'fa-brands fa-git'
      },
      {
        text: 'Github',
        icon: 'fa-brands fa-github'
      }
    ],
    githubURL: 'https://github.com/Abdulaziz-Fhid'
  }
])
