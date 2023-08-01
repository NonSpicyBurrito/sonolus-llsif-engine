import { connector } from '../../components/connector.mjs'
import { slide } from '../../components/slide.mjs'
import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { drawHand, playHitEffect, spawnHoldEffect } from '../../utils.mjs'

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
