import { layer, skin, sprites } from '../../../skin.js'
import { Note } from '../Note.js'

export abstract class SingleNote extends Note {
    singleImport = this.defineImport({
        sim: { name: 'sim', type: Boolean },
        hold: { name: 'hold', type: Boolean },
    })

    globalInitialize() {
        super.globalInitialize()
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
