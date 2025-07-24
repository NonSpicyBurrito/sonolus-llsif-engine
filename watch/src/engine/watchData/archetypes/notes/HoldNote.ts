import { windows } from '../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../buckets.js'
import { skin, sprites } from '../../skin.js'
import { archetypes } from '../index.js'
import { Note } from './Note.js'

export class HoldNote extends Note {
    holdImport = this.defineImport({
        prevRef: { name: 'prev', type: Number },
        accuracyDiff: { name: 'accuracyDiff', type: Number },
    })

    windows = windows.holdNote

    bucket = buckets.holdNote

    preprocessOrder = 1
    preprocess() {
        super.preprocess()

        this.import.lane = this.prevImport.lane
    }

    get hitTime() {
        return replay.isReplay
            ? this.prevImport.judgment
                ? this.targetTime + this.import.accuracy + this.holdImport.accuracyDiff
                : this.prevSharedMemory.despawnTime
            : this.targetTime
    }

    get prevImport() {
        return archetypes.TapNote.import.get(this.holdImport.prevRef)
    }

    get prevSharedMemory() {
        return archetypes.TapNote.sharedMemory.get(this.holdImport.prevRef)
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.tail, this.note.layout.mul(this.s), this.note.z, 1)
    }
}
