import { lanes, note } from './constants.mjs'
import { instruction } from './instruction.mjs'
import { particle } from './particle.mjs'
import { hand } from './shared.mjs'

export const noteLayout = (lane: number) => layout(lane, 1)

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

const layout = (lane: number, size: number) =>
    new Rect({
        l: -note.radius * size,
        r: note.radius * size,
        t: -note.radius * size,
        b: note.radius * size,
    }).add(new Vec(0, 1).rotate(-lane * lanes.angle))

export const approach = (now: number) => Math.unlerp(0, 2, now)

export const playHitEffect = () => particle.effects.hit.spawn(hitEffectLayout(), 0.35, false)

export const spawnHoldEffect = () => particle.effects.hold.spawn(holdEffectLayout(), 0.6, true)

export const drawHand = (angle: number, x: number, a: number) =>
    instruction.icons.hand.paint(
        new Vec(0, 1)
            .rotate(angle)
            .mul(0.25 * ui.configuration.instruction.scale)
            .add(hand.position)
            .translate(x, 0),
        0.25 * ui.configuration.instruction.scale,
        (180 * angle) / Math.PI,
        0,
        a * ui.configuration.instruction.alpha,
    )
