import { EngineDataBucket, Text } from 'sonolus-core'

export const createBucketDefinition = (
    sprites: Record<'smileHead' | 'smileArrow' | 'smileHold', { id: number }>,
) =>
    ({
        tapNote: {
            sprites: [
                {
                    id: sprites.smileHead.id,
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
                    id: sprites.smileHead.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: 0,
                },
                {
                    id: sprites.smileArrow.id,
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
                    id: sprites.smileHold.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.smileHead.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: 0,
                },
            ],
            unit: Text.MillisecondUnit,
        },
    }) as const satisfies Record<string, EngineDataBucket>
