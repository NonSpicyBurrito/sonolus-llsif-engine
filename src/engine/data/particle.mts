import { ParticleEffectName } from 'sonolus-core'

export const particle = defineParticle({
    effects: {
        smileHit: ParticleEffectName.NoteCircularTapRed,
        pureHit: ParticleEffectName.NoteCircularTapGreen,
        coolHit: ParticleEffectName.NoteCircularTapBlue,

        smileHold: ParticleEffectName.NoteLinearHoldRed,
        pureHold: ParticleEffectName.NoteLinearHoldGreen,
        coolHold: ParticleEffectName.NoteLinearHoldBlue,
    },
})
