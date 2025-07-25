import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'

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
