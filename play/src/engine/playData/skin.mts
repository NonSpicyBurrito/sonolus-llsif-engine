import { SkinSpriteName } from '@sonolus/core'

export const skin = defineSkin({
    sprites: {
        slot: SkinSpriteName.NoteSlot,

        smileHead: SkinSpriteName.NoteHeadRed,
        pureHead: SkinSpriteName.NoteHeadGreen,
        coolHead: SkinSpriteName.NoteHeadBlue,

        smileHold: SkinSpriteName.NoteConnectionRed,
        pureHold: SkinSpriteName.NoteConnectionGreen,
        coolHold: SkinSpriteName.NoteConnectionBlue,
        activeHold: 'LLSIF Connection Active',

        smileTail: SkinSpriteName.NoteTailRed,
        pureTail: SkinSpriteName.NoteTailGreen,
        coolTail: SkinSpriteName.NoteTailBlue,

        smileArrow: SkinSpriteName.DirectionalMarkerRed,
        pureArrow: SkinSpriteName.DirectionalMarkerGreen,
        coolArrow: SkinSpriteName.DirectionalMarkerBlue,

        smileSim: SkinSpriteName.SimultaneousMarkerRed,
        pureSim: SkinSpriteName.SimultaneousMarkerGreen,
        coolSim: SkinSpriteName.SimultaneousMarkerBlue,
    },
})

export const sprites = levelData({
    head: SkinSpriteId,
    connector: SkinSpriteId,
    tail: SkinSpriteId,
    arrow: SkinSpriteId,
    sim: SkinSpriteId,
})

export const layer = {
    note: {
        sim: 102,
        arrow: 101,
        body: 100,
    },

    slide: {
        sim: 92,
        arrow: 91,
        body: 90,
    },

    connector: 80,

    stage: 0,
}

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000
