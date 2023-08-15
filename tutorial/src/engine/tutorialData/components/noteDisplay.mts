import { note } from '../../../../../shared/src/engine/data/note.mjs'
import { noteLayout } from '../note.mjs'
import { segment } from '../segment.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    head: skin.sprites.head,
    tail: skin.sprites.tail,
}

enum Mode {
    None,
    Overlay,
    Fall,
    Frozen,
}

let mode = tutorialMemory(DataType<Mode>)

let id = tutorialMemory(SkinSpriteId)

export const noteDisplay = {
    update() {
        if (!mode) return

        if (mode === Mode.Overlay) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -note.radius * 1.5
            const r = note.radius * 1.5

            const t = 0.25 - note.radius * 1.5
            const b = 0.25 + note.radius * 1.5

            skin.sprites.draw(id, new Rect({ l, r, t, b }), layer.note, a)
        } else {
            const y = mode === Mode.Fall ? Math.unlerp(0, 2, segment.time) : 1

            skin.sprites.draw(id, noteLayout(0).mul(y), layer.note, 1)
        }
    },

    showOverlay(type: keyof typeof sprites) {
        mode = Mode.Overlay
        this.setType(type)
    },

    showFall(type: keyof typeof sprites) {
        mode = Mode.Fall
        this.setType(type)
    },

    showFrozen(type: keyof typeof sprites) {
        mode = Mode.Frozen
        this.setType(type)
    },

    clear() {
        mode = Mode.None
    },

    setType(type: keyof typeof sprites) {
        for (const [key, sprite] of Object.entries(sprites)) {
            if (key !== type) continue

            id = sprite.id
        }
    },
}
