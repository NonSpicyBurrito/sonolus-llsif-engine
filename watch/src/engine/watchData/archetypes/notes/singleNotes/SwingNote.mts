import { SwingDirection } from '../../../../../../../shared/src/engine/data/SwingDirection.mjs'
import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { options } from '../../../../configuration/options.mjs'
import { buckets } from '../../../buckets.mjs'
import { arrowLayout } from '../../../note.mjs'
import { getZ, layer, skin, sprites } from '../../../skin.mjs'
import { SingleNote } from './SingleNote.mjs'

export class SwingNote extends SingleNote {
    swingImport = this.defineImport({
        direction: { name: 'direction', type: DataType<SwingDirection> },
    })

    windows = windows.swingNote

    bucket = buckets.swingNote

    arrow = this.entityMemory({
        layout: Quad,
        z: Number,
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.swingImport.direction *= -1
    }

    globalInitialize() {
        super.globalInitialize()

        arrowLayout(this.import.lane, this.swingImport.direction).copyTo(this.arrow.layout)
        this.arrow.z = getZ(layer.note.arrow, this.targetTime, this.import.lane)
    }

    render() {
        super.render()

        skin.sprites.draw(sprites.arrow, this.arrow.layout.mul(this.s), this.arrow.z, 1)
    }
}
