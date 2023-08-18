import { noteLayout } from '../note.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    slot: skin.sprites.slot,
}

export const stage = {
    update() {
        for (let i = 0; i < 9; i++) {
            const layout = noteLayout(i - 4)

            sprites.slot.draw(layout, layer.stage, 1)
        }
    },
}
