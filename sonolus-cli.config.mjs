import { copyFileSync } from 'node:fs'

/** @type import('sonolus.js').SonolusCLIConfig */
export default {
    entry: './src/index.mts',
    devServer(sonolus) {
        copyFileSync('./src/level/bgm.mp3', './.dev/bgm.mp3')

        const level = sonolus.db.levels[0]
        level.bgm = {
            type: 'LevelBgm',
            hash: '29d6f9620c6dbd2fdc0175f1a8cf07de022d0575',
            url: '/bgm.mp3',
        }
    },
}
