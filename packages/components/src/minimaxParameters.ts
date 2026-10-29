const MINIMAX_ANTHROPIC_ENDPOINTS = {
    global_en: 'https://api.minimax.io/anthropic',
    cn_zh: 'https://api.minimaxi.com/anthropic'
} as const

const MINIMAX_TTS_ENDPOINTS = {
    global_en: 'https://api.minimax.io/v1/t2a_v2',
    cn_zh: 'https://api.minimaxi.com/v1/t2a_v2'
} as const

export const MINIMAX_TTS_MODELS = [
    'speech-2.8-hd',
    'speech-2.8-turbo',
    'speech-2.6-hd',
    'speech-2.6-turbo',
    'speech-02-hd',
    'speech-02-turbo',
    'speech-01-hd',
    'speech-01-turbo'
] as const

export const getMiniMaxAnthropicEndpoint = (region?: string): string => {
    return MINIMAX_ANTHROPIC_ENDPOINTS[region === 'cn_zh' ? 'cn_zh' : 'global_en']
}

export const getMiniMaxTTSEndpoint = (region?: string): string => {
    return MINIMAX_TTS_ENDPOINTS[region === 'cn_zh' ? 'cn_zh' : 'global_en']
}
