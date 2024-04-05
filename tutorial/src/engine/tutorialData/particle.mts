import { ParticleEffectName } from '@sonolus/core'
import { note } from '../../../../shared/src/engine/data/note.mjs'
import { layout } from '../../../../shared/src/engine/data/utils.mjs'

export const particle = defineParticle({
    effects: {
        hit: ParticleEffectName.NoteCircularTapRed,
        hold: ParticleEffectName.NoteLinearHoldRed,
    },
})

const hitEffectLayout = () => layout(0, 2)

const holdEffectLayout = () => {
    const l = -note.radius
    const r = note.radius
    const t = 1 - note.radius * 2
    const b = 1

    return new Quad({
        x1: l,
        y1: b,
        x2: l,
        y2: t,
        x3: r,
        y3: t,
        x4: r,
        y4: b,
    })
}

export const playHitEffect = () => particle.effects.hit.spawn(hitEffectLayout(), 0.35, false)

export const spawnHoldEffect = () => particle.effects.hold.spawn(holdEffectLayout(), 0.6, true)
