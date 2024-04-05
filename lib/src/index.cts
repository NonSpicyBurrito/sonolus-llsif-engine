import { DatabaseEngineItem } from '@sonolus/core'
import { resolve } from 'node:path'

export { nssToSIFC } from './nss/convert.cjs'
export * from './nss/index.cjs'
export { sifcToLevelData } from './sifc/convert.cjs'
export * from './sifc/index.cjs'

export const version = '1.4.0'

export const databaseEngineItem = {
    name: 'llsif',
    version: 12,
    title: {
        en: 'Love Live!',
        ja: 'ラブライブ！',
        ko: '러브라이브',
        zhs: 'Love Live!',
        zht: 'Love Live!',
    },
    subtitle: {
        en: 'Love Live! School idol festival',
        ja: 'ラブライブ！スクールアイドルフェスティバル',
        ko: '러브라이브 스쿨 아이돌 페스티벌',
        zhs: 'Love Live! 学园偶像祭',
        zht: 'Love Live! 學園偶像祭',
    },
    author: {
        en: 'Burrito',
    },
    description: {
        en: [
            'A recreation of Love Live! School idol festival engine in Sonolus.',
            '',
            'Version:',
            version,
            '',
            'GitHub Repository:',
            'https://github.com/NonSpicyBurrito/sonolus-llsif-engine',
        ].join('\n'),
    },
} as const satisfies Partial<DatabaseEngineItem>

export const engineConfigurationPath = resolve(__dirname, 'EngineConfiguration')
export const enginePlayDataPath = resolve(__dirname, 'EnginePlayData')
export const engineWatchDataPath = resolve(__dirname, 'EngineWatchData')
export const enginePreviewDataPath = resolve(__dirname, 'EnginePreviewData')
export const engineTutorialDataPath = resolve(__dirname, 'EngineTutorialData')
export const engineThumbnailPath = resolve(__dirname, 'thumbnail.png')
