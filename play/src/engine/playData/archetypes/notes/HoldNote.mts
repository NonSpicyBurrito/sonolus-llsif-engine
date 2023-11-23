import { buckets } from '../../buckets.mjs'
import { skin, sprites } from '../../skin.mjs'
import { windows } from '../../windows.mjs'
import { transform } from '../InputManager.mjs'
import { archetypes } from '../index.mjs'
import { Note } from './Note.mjs'

export class HoldNote extends Note {
    holdData = this.defineData({
        prevRef: { name: 'prev', type: Number },
    })

    windows = windows.holdNote

    bucket = buckets.holdNote

    preprocess() {
        super.preprocess()

        this.data.lane = this.prevData.lane

        const minPrevInputTime =
            bpmChanges.at(this.prevData.beat).time + windows.minGood + input.offset

        this.spawnTime = Math.min(this.spawnTime, minPrevInputTime)
    }

    touch() {
        const id = this.prevSingleSharedMemory.activatedTouchId
        if (!id) return

        for (const touch of touches) {
            if (touch.id !== id) continue

            if (!touch.ended) return

            const { lane, radius } = transform(touch.position)
            if (
                time.now >= this.inputTime.min &&
                Math.abs(radius - 1) <= 0.32 &&
                Math.abs(lane - this.data.lane) <= 0.5
            ) {
                this.complete(touch.t)
            } else {
                this.despawn = true
            }
            return
        }

        if (time.now >= this.inputTime.min) {
            this.complete(time.now)
        } else {
            this.despawn = true
        }
        return
    }

    updateParallel() {
        if (
            this.prevInfo.state === EntityState.Despawned &&
            !this.prevSingleSharedMemory.activatedTouchId
        )
            this.despawn = true

        super.updateParallel()
    }

    get prevInfo() {
        return entityInfos.get(this.holdData.prevRef)
    }

    get prevData() {
        return archetypes.TapNote.data.get(this.holdData.prevRef)
    }

    get prevSingleSharedMemory() {
        return archetypes.TapNote.singleSharedMemory.get(this.holdData.prevRef)
    }

    complete(hitTime: number) {
        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.tail, this.note.layout.mul(this.s), this.note.z, 1)
    }
}
