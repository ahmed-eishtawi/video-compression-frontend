type videoEncode = {
  bitrate: number
  psnr: number
}

type results = {
  differences: videoEncode
  h264: videoEncode
  h265: videoEncode
  qp: number
}

export type response = {
  message: string
  results: results[]
}

/* "about" types */

type technology = {
  text: string
  icon?: string
}

export type member = {
  name: string
  role: string
  technologies: technology[]
  githubURL: string
}
