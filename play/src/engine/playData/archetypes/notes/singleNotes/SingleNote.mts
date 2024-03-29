import { getZ, layer, skin, sprites } from '../../../skin.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    singleImport = this.defineImport({
        sim: { name: 'sim', type: Boolean },
        hold: { name: 'hold', type: Boolean },
    })

    singleSharedMemory = this.defineSharedMemory({
        activatedTouchId: TouchId,
    })

    sim = this.entityMemory({
        z: Number,
    })

    initialize() {
        super.initialize()

        if (this.singleImport.sim)
            this.sim.z = getZ(layer.note.sim, this.targetTime, this.import.lane)
    }

    get shouldRender() {
        return !this.singleImport.hold || time.now < this.targetTime
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.head, this.note.layout.mul(this.s), this.note.z, 1)

        if (this.singleImport.sim)
            skin.sprites.draw(sprites.sim, this.note.layout.mul(this.s), this.sim.z, 1)
    }
}
