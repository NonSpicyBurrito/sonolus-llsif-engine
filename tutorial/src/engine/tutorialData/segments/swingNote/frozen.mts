import { arrow } from '../../components/arrow.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'
import { instruction } from '../../instruction.mjs'
import { segment } from '../../shared.mjs'
import { drawHand } from '../../utils.mjs'

export const swingNoteFrozen = {
    enter() {
        arrow.showFrozen()
        noteDisplay.showFrozen('head')

        instruction.texts.slide.show()
    },

    update() {
        drawHand(
            Math.PI / 3,
            Math.remapClamped(0.25, 0.75, -0.25, 0.25, segment.time % 1),
            Math.unlerpClamped(0.5, 0.25, Math.abs((segment.time % 1) - 0.5)),
        )
    },

    exit() {
        arrow.clear()
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
