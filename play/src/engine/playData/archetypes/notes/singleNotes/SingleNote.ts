import { layer, skin, sprites } from '../../../skin.js'
import { markAsUsed } from '../../InputManager.js'
import { Note } from '../Note.js'

export abstract class SingleNote extends Note {
    singleImport = this.defineImport({
        sim: { name: 'sim', type: Boolean },
        hold: { name: 'hold', type: Boolean },
    })

    singleSharedMemory = this.defineSharedMemory({
        activatedTouchId: TouchId,
    })

    initialize() {
        super.initialize()
    }

    complete(touch: Touch, hitTime: number) {
        markAsUsed(touch)
        this.singleSharedMemory.activatedTouchId = touch.id

        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }

    render() {
        if (this.singleImport.hold && time.now >= this.targetTime) return

        super.render()

        skin.sprites.draw(
            sprites.head,
            this.note.layout.mul(this.s),
            [layer.note.body, -this.targetTime, -this.import.lane],
            1,
        )

        if (this.singleImport.sim)
            skin.sprites.draw(
                sprites.sim,
                this.note.layout.mul(this.s),
                [layer.note.sim, -this.targetTime, -this.import.lane],
                1,
            )
    }
}
