import { SwingDirection } from '../../../../../../../shared/src/engine/data/SwingDirection.mjs'
import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { options } from '../../../../configuration/options.mjs'
import { buckets } from '../../../buckets.mjs'
import { arrowLayout } from '../../../note.mjs'
import { getZ, layer, skin, sprites } from '../../../skin.mjs'
import { isUsed, transform } from '../../InputManager.mjs'
import { SingleNote } from './SingleNote.mjs'

export class SwingNote extends SingleNote {
    swingImport = this.defineImport({
        direction: { name: 'direction', type: DataType<SwingDirection> },
    })

    windows = windows.swingNote

    bucket = buckets.swingNote

    arrow = this.entityMemory({
        layout: Quad,
        z: Number,
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.swingImport.direction *= -1
    }

    initialize() {
        super.initialize()

        arrowLayout(this.import.lane, this.swingImport.direction).copyTo(this.arrow.layout)
        this.arrow.z = getZ(layer.note.arrow, this.targetTime, this.import.lane)
    }

    touch() {
        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (isUsed(touch)) continue

            const { lane, radius } = transform(touch.position)
            if (Math.abs(radius - 1) > 0.32) continue
            if (Math.abs(lane - this.import.lane) > 0.5) continue

            if (touch.started) {
                this.complete(touch, touch.startTime)
                return
            } else {
                const { lane: lastLane, radius: lastRadius } = transform(touch.lastPosition)
                if (Math.abs(lastRadius - 1) > 0.32) continue
                if (Math.abs(lastLane - this.import.lane) <= 0.5) continue

                this.complete(touch, touch.time)
                return
            }
        }
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.arrow, this.arrow.layout.mul(this.s), this.arrow.z, 1)
    }
}
