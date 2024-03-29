import { SwingDirection } from '../../../../../../../shared/src/engine/data/SwingDirection.mjs'
import { options } from '../../../../configuration/options.mjs'
import { arrowLayout } from '../../../note.mjs'
import { getZ, layer, skin, sprites } from '../../../skin.mjs'
import { SingleNote } from './SingleNote.mjs'

export class SwingNote extends SingleNote {
    swingData = this.defineData({
        direction: { name: 'direction', type: DataType<SwingDirection> },
    })

    arrow = this.entityMemory({
        layout: Quad,
        z: Number,
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.swingData.direction *= -1
    }

    globalInitialize() {
        super.globalInitialize()

        arrowLayout(this.data.lane, this.swingData.direction).copyTo(this.arrow.layout)
        this.arrow.z = getZ(layer.note.arrow, this.targetTime, this.data.lane)
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.arrow, this.arrow.layout.mul(this.s), this.arrow.z, 1)
    }
}
