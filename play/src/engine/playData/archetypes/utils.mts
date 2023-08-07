import { options } from '../../configuration/options.mjs'
import { lanes } from './lanes.mjs'
import { note } from './note.mjs'
import { SwingDirection } from './SwingDirection.mjs'

export const noteLayout = (lane: number) => layout(lane, options.noteSize)

export const hitEffectLayout = (lane: number) => layout(lane, 2 * options.noteEffectSize)

const layout = (lane: number, size: number) =>
    new Rect({
        l: -note.radius * size,
        r: note.radius * size,
        t: -note.radius * size,
        b: note.radius * size,
    }).add(new Vec(0, 1).rotate(-lane * lanes.angle))

export const arrowLayout = (lane: number, direction: SwingDirection) => {
    const x = Math.sin(lane * lanes.angle)
    const y = Math.cos(lane * lanes.angle)

    const a = -lane * lanes.angle - Math.PI / 4 + (Math.PI / 2) * (direction - 1)

    const p = Math.cos(a) * Math.SQRT2 * note.radius * options.noteSize
    const q = Math.sin(a) * Math.SQRT2 * note.radius * options.noteSize

    return new Quad({
        x1: -p,
        y1: -q,
        x2: -q,
        y2: p,
        x3: p,
        y3: q,
        x4: q,
        y4: -p,
    }).translate(x, y)
}

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

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000

export const getScheduleSFXTime = (targetTime: number) =>
    targetTime - 0.5 - Math.max(audio.offset, 0)
