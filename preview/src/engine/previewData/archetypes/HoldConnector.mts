import { options } from '../../configuration/options.mjs'
import { panel } from '../panel.mjs'
import { getZ, layer, skin, sprites } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldConnector extends Archetype {
    data = this.defineData({
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
    })

    render() {
        const t = {
            min: bpmChanges.at(this.headData.beat).time,
            max: bpmChanges.at(this.tailData.beat).time,
        }

        const index = {
            min: Math.floor(t.min / panel.duration),
            max: Math.floor(t.max / panel.duration),
        }

        const lane = this.headData.lane
        const l = lane - 0.5 * options.noteSize
        const r = lane + 0.5 * options.noteSize

        const z = getZ(layer.connector, t.min, lane)

        for (let i = index.min; i <= index.max; i++) {
            const pt = {
                min: Math.max(t.min, i * panel.duration),
                max: Math.min(t.max, (i + 1) * panel.duration),
            }

            const y = {
                min: panel.positionFromLocation(i, pt.min - i * panel.duration),
                max: panel.positionFromLocation(i, pt.max - i * panel.duration),
            }

            const lb = y.min.translate(l, 0)
            const rt = y.max.translate(r, 0)

            skin.sprites.draw(
                sprites.connector,
                new Rect({
                    l: lb.x,
                    r: rt.x,
                    b: lb.y,
                    t: rt.y,
                }),
                z,
                options.connectorAlpha,
            )
        }
    }

    get headData() {
        return archetypes.TapNote.data.get(this.data.headRef)
    }

    get tailData() {
        return archetypes.TapNote.data.get(this.data.tailRef)
    }
}
