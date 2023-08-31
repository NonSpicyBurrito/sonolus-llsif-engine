import { layer, sprites } from '../../skin.mjs'
import { archetypes } from '../index.mjs'
import { Note } from './Note.mjs'

export class HoldNote extends Note {
    holdData = this.defineData({
        prevRef: { name: 'prev', type: Number },
    })

    preprocessOrder = 1
    preprocess() {
        super.preprocess()

        this.data.lane = this.prevData.lane
    }

    render() {
        this.renderSprite(sprites.tail, layer.note.body)
    }

    get prevData() {
        return archetypes.TapNote.data.get(this.holdData.prevRef)
    }
}
