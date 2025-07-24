import { SwingDirection } from '../../../../../../../shared/src/engine/data/SwingDirection.js'
import { windows } from '../../../../../../../shared/src/engine/data/windows.js'
import { options } from '../../../../configuration/options.js'
import { buckets } from '../../../buckets.js'
import { arrowLayout } from '../../../note.js'
import { getZ, layer, skin, sprites } from '../../../skin.js'
import { isUsed, transform } from '../../InputManager.js'
import { SingleNote } from './SingleNote.js'

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
