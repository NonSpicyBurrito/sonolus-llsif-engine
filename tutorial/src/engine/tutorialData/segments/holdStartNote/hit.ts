import { connector } from '../../components/connector.js'
import { slide } from '../../components/slide.js'
import { effect } from '../../effect.js'
import { drawHand } from '../../instruction.js'
import { particle, playHitEffect, spawnHoldEffect } from '../../particle.js'

let effectInstanceId = tutorialMemory(ParticleEffectInstanceId)

export const holdStartNoteHit = {
    enter() {
        slide.show()
        connector.showActive()

        effect.clips.perfect.play(0)

        playHitEffect()
        effectInstanceId = spawnHoldEffect()
    },

    update() {
        drawHand(Math.PI / 3, 0, 1)
    },

    exit() {
        slide.clear()
        connector.clear()

        particle.effects.destroy(effectInstanceId)
    },
}
