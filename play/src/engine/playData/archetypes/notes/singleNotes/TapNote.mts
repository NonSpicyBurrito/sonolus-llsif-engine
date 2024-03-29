import { buckets } from '../../../buckets.mjs'
import { windows } from '../../../windows.mjs'
import { isUsed, markAsUsed, transform } from '../../InputManager.mjs'
import { SingleNote } from './SingleNote.mjs'

export class TapNote extends SingleNote {
    windows = windows.tapNote

    bucket = buckets.tapNote

    touch() {
        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!touch.started) continue
            if (isUsed(touch)) continue

            const { lane, radius } = transform(touch.position)
            if (Math.abs(radius - 1) > 0.32) continue
            if (Math.abs(lane - this.import.lane) > 0.5) continue

            this.complete(touch)
            return
        }
    }

    complete(touch: Touch) {
        markAsUsed(touch)
        this.singleSharedMemory.activatedTouchId = touch.id

        this.result.judgment = input.judge(touch.startTime, this.targetTime, this.windows)
        this.result.accuracy = touch.startTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }
}
