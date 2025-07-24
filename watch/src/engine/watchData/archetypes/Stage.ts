import { noteLayout } from '../note.js'
import { layer, skin } from '../skin.js'

export class Stage extends Archetype {
    spawnTime() {
        return -999999
    }

    despawnTime() {
        return 999999
    }

    updateParallel() {
        for (let i = 0; i < 9; i++) {
            const layout = noteLayout(i - 4)

            skin.sprites.slot.draw(layout, layer.stage, 1)
        }
    }
}
