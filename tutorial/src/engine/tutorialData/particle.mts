import { ParticleEffectName } from 'sonolus-core'

export const particle = defineParticle({
    effects: {
        hit: ParticleEffectName.NoteCircularTapRed,
        hold: ParticleEffectName.NoteLinearHoldRed,
    },
})
