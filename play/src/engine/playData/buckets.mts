import { Text } from 'sonolus-core'
import { skin } from './skin.mjs'

export const buckets = defineBuckets({
    tapNote: {
        sprites: [
            {
                id: skin.sprites.smileHead.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: 0,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    swingNote: {
        sprites: [
            {
                id: skin.sprites.smileHead.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: 0,
            },
            {
                id: skin.sprites.smileArrow.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    holdNote: {
        sprites: [
            {
                id: skin.sprites.smileHold.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.smileHead.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: 0,
            },
        ],
        unit: Text.MillisecondUnit,
    },
})
