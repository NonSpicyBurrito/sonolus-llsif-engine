import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { chart } from '../../chart.mjs'
import { panel } from '../../panel.mjs'
import { scaledScreen } from '../../scaledScreen.mjs'
import { getZ, skin } from '../../skin.mjs'

export abstract class Note extends Archetype {
    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
    })

    preprocess() {
        chart.beats = Math.max(chart.beats, this.import.beat)
        chart.duration = Math.max(chart.duration, bpmChanges.at(this.import.beat).time)

        if (options.mirror) this.import.lane *= -1
    }

    renderSprite(spriteId: SkinSpriteId, layer: number, rotate: 'up' | 'left' | 'right' = 'up') {
        const time = bpmChanges.at(this.import.beat).time
        const pos = panel.getPos(time)

        const z = getZ(layer, time, this.import.lane)

        const layout = new Rect({
            l: this.import.lane - 0.5 * options.noteSize,
            r: this.import.lane + 0.5 * options.noteSize,
            b: -0.5 * options.noteSize * scaledScreen.wToH,
            t: 0.5 * options.noteSize * scaledScreen.wToH,
        }).add(pos)

        switch (rotate) {
            case 'up':
                skin.sprites.draw(spriteId, layout, z, 1)
                break
            case 'left':
                skin.sprites.draw(spriteId, layout.toQuad().swapRotate270(), z, 1)
                break
            case 'right':
                skin.sprites.draw(spriteId, layout.toQuad().swapRotate90(), z, 1)
                break
        }
    }
}
