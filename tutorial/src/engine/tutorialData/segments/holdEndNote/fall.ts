import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'
import { slide } from '../../components/slide.js'
import { drawHand } from '../../instruction.js'
import { particle, spawnHoldEffect } from '../../particle.js'

let effectInstanceId = tutorialMemory(ParticleEffectInstanceId)

export const holdEndNoteFall = {
    enter() {
        slide.show()
        noteDisplay.showFall('tail')
        connector.showFallOut()

        effectInstanceId = spawnHoldEffect()
    },

    update() {
        drawHand(Math.PI / 3, 0, 1)
    },

    exit() {
        slide.clear()
        noteDisplay.clear()
        connector.clear()

        particle.effects.destroy(effectInstanceId)
    },
}
