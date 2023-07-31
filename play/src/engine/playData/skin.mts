import { SkinSpriteName } from 'sonolus-core'

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
