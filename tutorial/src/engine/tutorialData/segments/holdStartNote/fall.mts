import { connector } from '../../components/connector.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'

export const holdStartNoteFall = {
    enter() {
        noteDisplay.showFall('head')
        connector.showFallIn()
    },

    exit() {
        noteDisplay.clear()
        connector.clear()
    },
}
