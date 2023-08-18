import { connector } from '../../components/connector.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'

export const holdStartNoteIntro = {
    enter() {
        noteDisplay.showOverlay('head')
        connector.showOverlayIn()
    },

    exit() {
        noteDisplay.clear()
        connector.clear()
    },
}
