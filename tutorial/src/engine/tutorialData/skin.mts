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

export const layer = {
    arrow: 101,
    note: 100,

    slide: 90,

    connector: 80,

    stage: 0,
}
