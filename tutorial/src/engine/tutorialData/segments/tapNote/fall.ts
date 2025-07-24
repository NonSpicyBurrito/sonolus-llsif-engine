import { noteDisplay } from '../../components/noteDisplay.js'

export const tapNoteFall = {
    enter() {
        noteDisplay.showFall('head')
    },

    exit() {
        noteDisplay.clear()
    },
}
