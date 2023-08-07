import { layer, skin, sprites } from '../../../skin.mjs'
import { getZ } from '../../../utils.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    singleData = this.defineData({
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

        if (this.singleData.sim) this.sim.z = getZ(layer.note.sim, this.targetTime, this.data.lane)
    }

    get shouldRender() {
        return !this.singleData.hold || time.now < this.targetTime
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.head, this.note.layout.mul(this.s), this.note.z, 1)

        if (this.singleData.sim)
            skin.sprites.draw(sprites.sim, this.note.layout.mul(this.s), this.sim.z, 1)
    }
}
