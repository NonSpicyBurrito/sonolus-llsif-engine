import { lanes } from './lanes.mjs'
import { note } from './note.mjs'

export const layout = (lane: number, size: number) =>
    new Rect({
        l: -note.radius * size,
        r: note.radius * size,
        t: -note.radius * size,
        b: note.radius * size,
    }).add(new Vec(0, 1).rotate(-lane * lanes.angle))
