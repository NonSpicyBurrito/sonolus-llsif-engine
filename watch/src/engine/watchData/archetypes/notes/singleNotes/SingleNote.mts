import { getZ, layer, skin, sprites } from '../../../skin.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    singleData = this.defineData({
        sim: { name: 'sim', type: Boolean },
    })

    sim = this.entityMemory({
        z: Number,
    })

    globalInitialize() {
        super.globalInitialize()

        if (this.singleData.sim) this.sim.z = getZ(layer.note.sim, this.targetTime, this.data.lane)
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.head, this.note.layout.mul(this.s), this.note.z, 1)

        if (this.singleData.sim)
            skin.sprites.draw(sprites.sim, this.note.layout.mul(this.s), this.sim.z, 1)
    }
}
