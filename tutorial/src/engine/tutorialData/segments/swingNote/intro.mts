import { arrow } from '../../components/arrow.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'

export const swingNoteIntro = {
    enter() {
        arrow.showOverlay()
        noteDisplay.showOverlay('head')
    },

    exit() {
        arrow.clear()
        noteDisplay.clear()
    },
}
