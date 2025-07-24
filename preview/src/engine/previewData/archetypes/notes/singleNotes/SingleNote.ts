import { layer, sprites } from '../../../skin.js'
import { Note } from '../Note.js'

export abstract class SingleNote extends Note {
    singleImport = this.defineImport({
        sim: { name: 'sim', type: Boolean },
    })

    render() {
        this.renderSprite(sprites.head, layer.note.body)

        if (this.singleImport.sim) this.renderSprite(sprites.sim, layer.note.sim)
    }
}
