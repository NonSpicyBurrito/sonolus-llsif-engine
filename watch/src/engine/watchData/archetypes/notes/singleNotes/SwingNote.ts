import { SwingDirection } from '../../../../../../../shared/src/engine/data/SwingDirection.js'
import { windows } from '../../../../../../../shared/src/engine/data/windows.js'
import { options } from '../../../../configuration/options.js'
import { buckets } from '../../../buckets.js'
import { arrowLayout } from '../../../note.js'
import { getZ, layer, skin, sprites } from '../../../skin.js'
import { SingleNote } from './SingleNote.js'

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
