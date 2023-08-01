import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { segment } from '../shared.mjs'
import { skin } from '../skin.mjs'
import { approach } from '../utils.mjs'

const sprites = {
    arrow: skin.sprites.arrow,
}

let mode = tutorialMemory(DataType<0 | 1 | 2 | 3>)

const layout = new Quad({
    x1: -1,
    x2: 1,
    x3: 1,
    x4: -1,
    y1: -1,
    y2: -1,
    y3: 1,
    y4: 1,
})

export const arrow = {
    update() {
        if (!mode) return

        if (mode === 1) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            sprites.arrow.draw(layout.mul(note.radius * 1.5).translate(0, 0.25), layer.arrow, a)
        } else {
            const y = mode === 2 ? approach(segment.time) : 1

            sprites.arrow.draw(layout.mul(note.radius).translate(0, 1).mul(y), layer.arrow, 1)
        }
    },

    showOverlay() {
        mode = 1
    },

    showFall() {
        mode = 2
    },

    showFrozen() {
        mode = 3
    },

    clear() {
        mode = 0
    },
}
