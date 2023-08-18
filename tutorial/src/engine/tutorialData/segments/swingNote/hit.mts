import { effect } from '../../effect.mjs'
import { playHitEffect } from '../../particle.mjs'

export const swingNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playHitEffect()
    },
}
