import { windows } from '../../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../../buckets.js'
import { isUsed, transform } from '../../InputManager.js'
import { SingleNote } from './SingleNote.js'

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

            this.complete(touch, touch.startTime)
            return
        }
    }
}
