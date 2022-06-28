
export interface VoiceButtonInfoVo {
  id: string,
  start: number,
  end: number,
  videoId: string,
  streamer: string,
  text: string
}

export function initVoiceButton (): VoiceButtonInfoVo {
  return {
    id: '',
    start: 1,
    end: 1,
    videoId: '',
    streamer: '',
    text: ''
  }
}

