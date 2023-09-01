import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { chart } from '../../chart.mjs'
import { panel } from '../../panel.mjs'
import { scaledScreen } from '../../scaledScreen.mjs'
import { getZ, skin } from '../../skin.mjs'

export abstract class Note extends Archetype {
    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
    })

    preprocess() {
        chart.beats = Math.max(chart.beats, this.data.beat)
        chart.duration = Math.max(chart.duration, bpmChanges.at(this.data.beat).time)

        if (options.mirror) this.data.lane *= -1
    }

    renderSprite(spriteId: SkinSpriteId, layer: number, rotate: 'up' | 'left' | 'right' = 'up') {
        const time = bpmChanges.at(this.data.beat).time
        const pos = panel.getPos(time)

        const z = getZ(layer, time, this.data.lane)

        const layout = new Rect({
            l: this.data.lane - 0.5 * options.noteSize,
            r: this.data.lane + 0.5 * options.noteSize,
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
