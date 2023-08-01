import { noteDisplay } from '../../components/noteDisplay.mjs'

export const tapNoteIntro = {
    enter() {
        noteDisplay.showOverlay('head')
    },

    exit() {
        noteDisplay.clear()
    },
}
