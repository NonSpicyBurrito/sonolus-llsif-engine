import { arrow } from '../../components/arrow.js'
import { noteDisplay } from '../../components/noteDisplay.js'

export const swingNoteFall = {
    enter() {
        arrow.showFall()
        noteDisplay.showFall('head')
    },

    exit() {
        arrow.clear()
        noteDisplay.clear()
    },
}
