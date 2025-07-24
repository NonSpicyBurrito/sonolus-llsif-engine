import { note } from '../../../../../shared/src/engine/data/note.js'
import { segment } from '../segment.js'
import { layer, skin } from '../skin.js'

const sprites = {
    normal: skin.sprites.hold,
    active: skin.sprites.activeHold,

    get useFallback() {
        return !this.active.exists
    },
}

enum Mode {
    None,
    OverlayIn,
    OverlayOut,
    FallIn,
    FallOut,
    Frozen,
    Active,
}

let mode = tutorialMemory(DataType<Mode>)

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

        if (mode === Mode.OverlayIn || mode === Mode.OverlayOut) {
            const a = 0.5 * Math.unlerpClamped(1, 0.75, segment.time)

            const l = -note.radius * 1.5
            const r = note.radius * 1.5

            const t = 0.25 - (mode === Mode.OverlayIn ? note.radius * 3 : 0)
            const b = 0.25 + (mode === Mode.OverlayOut ? note.radius * 3 : 0)

            const layout = new Rect({ l, r, t, b })

            if (mode === Mode.OverlayIn || sprites.useFallback) {
                sprites.normal.draw(layout, layer.connector, a)
            } else {
                sprites.active.draw(layout, layer.connector, a)
            }
        } else if (mode === Mode.FallIn || mode === Mode.Frozen) {
            const t = Math.unlerp(0, 2, 0)
            const b = Math.unlerp(0, 2, mode === Mode.FallIn ? segment.time : 2)

            const layout = connectorLayout(t, b)

            sprites.normal.draw(layout, layer.connector, 0.5)
        } else {
            const t = Math.unlerp(0, 2, mode === Mode.FallOut ? segment.time : 0)
            const b = Math.unlerp(0, 2, 2)

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
        mode = Mode.OverlayIn
    },

    showOverlayOut() {
        mode = Mode.OverlayOut
    },

    showFallIn() {
        mode = Mode.FallIn
    },

    showFallOut() {
        mode = Mode.FallOut
    },

    showFrozen() {
        mode = Mode.Frozen
    },

    showActive() {
        mode = Mode.Active
    },

    clear() {
        mode = Mode.None
    },
}
