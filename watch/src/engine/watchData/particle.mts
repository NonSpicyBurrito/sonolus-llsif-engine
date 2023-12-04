import { ParticleEffectName } from 'sonolus-core'
import { lanes } from '../../../../shared/src/engine/data/lanes.mjs'
import { layout } from '../../../../shared/src/engine/data/utils.mjs'
import { options } from '../configuration/options.mjs'
import { note } from './note.mjs'

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

export const effects = levelData({
    hit: ParticleEffectId,
    hold: ParticleEffectId,
})

export const hitEffectLayout = (lane: number) => layout(lane, 2 * options.noteEffectSize)

export const holdEffectLayout = (lane: number) => {
    const l = -note.radius * options.noteEffectSize
    const r = note.radius * options.noteEffectSize
    const t = 1 - note.radius * options.noteEffectSize * 2
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
    }).rotate(-lane * lanes.angle)
}
