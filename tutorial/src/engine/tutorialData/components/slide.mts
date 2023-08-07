import { noteLayout } from '../note.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    slide: skin.sprites.head,
}

let mode = tutorialMemory(Boolean)

export const slide = {
    update() {
        if (!mode) return

        sprites.slide.draw(noteLayout(0), layer.slide, 1)
    },

    show() {
        mode = true
    },

    clear() {
        mode = false
    },
}
