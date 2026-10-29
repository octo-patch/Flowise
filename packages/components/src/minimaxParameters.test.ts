import * as fs from 'fs'
import * as path from 'path'
import { getMiniMaxAnthropicEndpoint, getMiniMaxTTSEndpoint, MINIMAX_TTS_MODELS } from './minimaxParameters'

describe('MiniMax parameter refresh', () => {
    const modelsPath = path.join(__dirname, '..', 'models.json')
    const models = JSON.parse(fs.readFileSync(modelsPath, 'utf8'))
    const catalog = models.chat.find((entry: any) => entry.name === 'chatMiniMax')

    it('records the current model parameters', () => {
        expect(catalog.models).toEqual([
            expect.objectContaining({
                name: 'MiniMax-M3',
                context_window: 1000000,
                pricing_usd_per_million_tokens: {
                    input: 0.3,
                    output: 1.2,
                    cache_read: 0.06,
                    cache_write: null,
                    above_512k: { input: 0.6, output: 2.4, cache_read: 0.12, cache_write: null }
                },
                input_modalities: ['text', 'image', 'video'],
                thinking: ['adaptive', 'disabled'],
                service_tier: 'supported'
            }),
            expect.objectContaining({
                name: 'MiniMax-M3.1-Flash',
                context_window: 1000000,
                pricing_usd_per_million_tokens: { input: 0.15, output: 0.6, cache_read: 0.015, cache_write: null },
                input_modalities: ['text', 'image', 'video'],
                thinking: ['adaptive'],
                thinking_effort_default: 'max'
            })
        ])
    })

    it('resolves both supported regions', () => {
        expect(getMiniMaxAnthropicEndpoint()).toBe('https://api.minimax.io/anthropic')
        expect(getMiniMaxAnthropicEndpoint('cn_zh')).toBe('https://api.minimaxi.com/anthropic')
        expect(getMiniMaxTTSEndpoint()).toBe('https://api.minimax.io/v1/t2a_v2')
        expect(getMiniMaxTTSEndpoint('cn_zh')).toBe('https://api.minimaxi.com/v1/t2a_v2')
    })

    it('keeps the current speech model order and default', () => {
        expect(MINIMAX_TTS_MODELS).toEqual([
            'speech-2.8-hd',
            'speech-2.8-turbo',
            'speech-2.6-hd',
            'speech-2.6-turbo',
            'speech-02-hd',
            'speech-02-turbo',
            'speech-01-hd',
            'speech-01-turbo'
        ])
        expect(MINIMAX_TTS_MODELS[0]).toBe('speech-2.8-hd')
    })
})
