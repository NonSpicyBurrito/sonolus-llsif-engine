import { SwingDirection } from '../../../../../../../shared/src/engine/data/SwingDirection.mjs'
import { options } from '../../../../configuration/options.mjs'
import { layer, sprites } from '../../../skin.mjs'
import { SingleNote } from './SingleNote.mjs'

export class SwingNote extends SingleNote {
    swingData = this.defineData({
        direction: { name: 'direction', type: DataType<SwingDirection> },
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.swingData.direction *= -1
    }

    render() {
        super.render()

        switch (this.swingData.direction) {
            case SwingDirection.Left:
                this.renderSprite(sprites.arrow, layer.note.arrow, 'left')
                break
            case SwingDirection.Right:
                this.renderSprite(sprites.arrow, layer.note.arrow, 'right')
                break
        }
    }
}
