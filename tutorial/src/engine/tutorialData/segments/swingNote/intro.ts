import { arrow } from '../../components/arrow.js'
import { noteDisplay } from '../../components/noteDisplay.js'

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
