import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'

export const holdEndNoteIntro = {
    enter() {
        noteDisplay.showOverlay('tail')
        connector.showOverlayOut()
    },

    exit() {
        noteDisplay.clear()
        connector.clear()
    },
}
