import { arrow } from '../../components/arrow.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'

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
