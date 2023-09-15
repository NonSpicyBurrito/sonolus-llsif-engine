import { SwingDirection } from '../../../../../../../shared/src/engine/data/SwingDirection.mjs'
import { options } from '../../../../configuration/options.mjs'
import { buckets } from '../../../buckets.mjs'
import { arrowLayout } from '../../../note.mjs'
import { getZ, layer, skin, sprites } from '../../../skin.mjs'
import { windows } from '../../../windows.mjs'
import { isUsed, markAsUsed, transform } from '../../InputManager.mjs'
import { SingleNote } from './SingleNote.mjs'

export class SwingNote extends SingleNote {
    swingData = this.defineData({
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

        if (options.mirror) this.swingData.direction *= -1
    }

    initialize() {
        super.initialize()

        arrowLayout(this.data.lane, this.swingData.direction).copyTo(this.arrow.layout)
        this.arrow.z = getZ(layer.note.arrow, this.targetTime, this.data.lane)
    }

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            const { lane, radius } = transform(touch.position)
            if (Math.abs(radius - 1) > 0.32) continue
            if (Math.abs(lane - this.data.lane) > 0.5) continue

            if (touch.started) {
                if (isUsed(touch)) continue

                markAsUsed(touch)

                this.complete(touch, touch.startTime)
                return
            } else {
                const { lane: lastLane, radius: lastRadius } = transform(touch.lastPosition)
                if (Math.abs(lastRadius - 1) > 0.32) continue
                if (Math.abs(lastLane - this.data.lane) <= 0.5) continue

                this.complete(touch, touch.time)
                return
            }
        }
    }

    complete(touch: Touch, hitTime: number) {
        this.singleSharedMemory.activatedTouchId = touch.id

        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.arrow, this.arrow.layout.mul(this.s), this.arrow.z, 1)
    }
}
