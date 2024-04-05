import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../buckets.mjs'
import { skin, sprites } from '../../skin.mjs'
import { transform } from '../InputManager.mjs'
import { archetypes } from '../index.mjs'
import { Note } from './Note.mjs'

export class HoldNote extends Note {
    holdImport = this.defineImport({
        prevRef: { name: 'prev', type: Number },
    })

    export = this.defineExport({
        accuracyDiff: { name: 'accuracyDiff', type: Number },
    })

    windows = windows.holdNote

    bucket = buckets.holdNote

    preprocessOrder = 1
    preprocess() {
        super.preprocess()

        this.import.lane = this.prevImport.lane

        const minPrevInputTime =
            bpmChanges.at(this.prevImport.beat).time + windows.minGood + input.offset

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
                Math.abs(lane - this.import.lane) <= 0.5
            ) {
                this.complete(touch.t)
            } else {
                this.incomplete(touch.t)
            }
            return
        }

        if (time.now >= this.inputTime.min) {
            this.complete(time.now)
        } else {
            this.incomplete(time.now)
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
        return entityInfos.get(this.holdImport.prevRef)
    }

    get prevImport() {
        return archetypes.TapNote.import.get(this.holdImport.prevRef)
    }

    get prevSingleSharedMemory() {
        return archetypes.TapNote.singleSharedMemory.get(this.holdImport.prevRef)
    }

    complete(hitTime: number) {
        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }

    incomplete(hitTime: number) {
        this.export('accuracyDiff', hitTime - this.result.accuracy - this.targetTime)

        this.despawn = true
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.tail, this.note.layout.mul(this.s), this.note.z, 1)
    }
}
