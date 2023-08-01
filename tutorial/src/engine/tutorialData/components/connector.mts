import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { segment } from '../shared.mjs'
import { skin } from '../skin.mjs'
import { approach } from '../utils.mjs'

const sprites = {
    normal: skin.sprites.hold,
    active: skin.sprites.activeHold,

    get useFallback() {
        return !this.active.exists
    },
}

let mode = tutorialMemory(DataType<0 | 1 | 2 | 3 | 4 | 5 | 6>)

const connectorLayout = (t: number, b: number) =>
    new Quad({
        x1: -note.radius * b,
        x2: -note.radius * t,
        x3: note.radius * t,
        x4: note.radius * b,
        y1: b,
        y2: t,
        y3: t,
        y4: b,
    })

export const connector = {
    update() {
        if (!mode) return

        if (mode === 1 || mode === 2) {
            const a = 0.5 * Math.unlerpClamped(1, 0.75, segment.time)

            const l = -note.radius * 1.5
            const r = note.radius * 1.5

            const t = 0.25 - (mode === 1 ? note.radius * 3 : 0)
            const b = 0.25 + (mode === 2 ? note.radius * 3 : 0)

            const layout = new Rect({ l, r, t, b })

            if (mode === 1 || sprites.useFallback) {
                sprites.normal.draw(layout, layer.connector, a)
            } else {
                sprites.active.draw(layout, layer.connector, a)
            }
        } else if (mode === 3 || mode === 5) {
            const t = approach(0)
            const b = approach(mode === 3 ? segment.time : 2)

            const layout = connectorLayout(t, b)

            sprites.normal.draw(layout, layer.connector, 0.5)
        } else {
            const t = approach(mode === 4 ? segment.time : 0)
            const b = approach(2)

            const layout = connectorLayout(t, b)

            if (sprites.useFallback) {
                sprites.normal.draw(layout, layer.connector, 0.5)
            } else {
                const a = 0.5 * Math.abs(Math.sin(segment.time * Math.PI * 2))

                sprites.active.draw(layout, layer.connector, a)
            }
        }
    },

    showOverlayIn() {
        mode = 1
    },

    showOverlayOut() {
        mode = 2
    },

    showFallIn() {
        mode = 3
    },

    showFallOut() {
        mode = 4
    },

    showFrozen() {
        mode = 5
    },

    showActive() {
        mode = 6
    },

    clear() {
        mode = 0
    },
}
