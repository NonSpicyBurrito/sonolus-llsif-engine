import { layer, sprites } from '../../skin.js'
import { archetypes } from '../index.js'
import { Note } from './Note.js'

export class HoldNote extends Note {
    holdImport = this.defineImport({
        prevRef: { name: 'prev', type: Number },
    })

    preprocessOrder = 1
    preprocess() {
        super.preprocess()

        this.import.lane = this.prevImport.lane
    }

    render() {
        this.renderSprite(sprites.tail, layer.note.body)
    }

    get prevImport() {
        return archetypes.TapNote.import.get(this.holdImport.prevRef)
    }
}
