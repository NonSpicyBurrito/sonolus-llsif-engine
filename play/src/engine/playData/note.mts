import { options } from '../configuration/options.mjs'
import { SwingDirection } from './archetypes/SwingDirection.mjs'
import { lanes } from './lanes.mjs'
import { layout } from './utils.mjs'

export const note = {
    radius: 0.1 / 0.625,
}

export const noteLayout = (lane: number) => layout(lane, options.noteSize)

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
