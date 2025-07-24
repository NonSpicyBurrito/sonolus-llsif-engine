import { noteDisplay } from '../../components/noteDisplay.js'

export const tapNoteIntro = {
    enter() {
        noteDisplay.showOverlay('head')
    },

    exit() {
        noteDisplay.clear()
    },
}
