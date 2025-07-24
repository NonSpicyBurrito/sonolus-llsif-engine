import { DatabaseEngineItem } from '@sonolus/core'

export { nssToSIFC } from './nss/convert.js'
export * from './nss/index.js'
export { sifcToLevelData } from './sifc/convert.js'
export * from './sifc/index.js'

export const version = '1.5.3'

export const databaseEngineItem = {
    name: 'llsif',
    version: 13,
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
        en: 'Burrito#1000',
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
