import { noteDisplay } from '../../components/noteDisplay.mjs'

export const tapNoteFall = {
    enter() {
        noteDisplay.showFall('head')
    },

    exit() {
        noteDisplay.clear()
    },
}
