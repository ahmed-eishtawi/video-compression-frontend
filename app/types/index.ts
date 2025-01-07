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
