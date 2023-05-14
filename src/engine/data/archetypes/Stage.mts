import { skin } from '../skin.mjs'
import { layer } from './layer.mjs'
import { noteLayout } from './utils.mjs'

export class Stage extends Archetype {
    spawnOrder() {
        return 2
    }

    updateParallel() {
        for (let i = 0; i < 9; i++) {
            const layout = noteLayout(i - 4)

            skin.sprites.slot.draw(layout, layer.stage, 1)
        }
    }
}
