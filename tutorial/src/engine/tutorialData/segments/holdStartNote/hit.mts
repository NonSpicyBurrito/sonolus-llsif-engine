import { connector } from '../../components/connector.mjs'
import { slide } from '../../components/slide.mjs'
import { effect } from '../../effect.mjs'
import { drawHand } from '../../instruction.mjs'
import { particle, playHitEffect, spawnHoldEffect } from '../../particle.mjs'

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
