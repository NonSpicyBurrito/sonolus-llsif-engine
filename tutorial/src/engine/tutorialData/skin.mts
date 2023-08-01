import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        slot: SkinSpriteName.NoteSlot,

        head: SkinSpriteName.NoteHeadRed,

        hold: SkinSpriteName.NoteConnectionRed,
        activeHold: 'LLSIF Connection Active',

        tail: SkinSpriteName.NoteTailRed,

        arrow: SkinSpriteName.DirectionalMarkerRed,
    },
})
