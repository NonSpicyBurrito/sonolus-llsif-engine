import { SkinSpriteName } from '@sonolus/core'
import { panel } from './panel.mjs'

export const skin = defineSkin({
    renderMode: 'standard',
    sprites: {
        lane: SkinSpriteName.Lane,
        laneAlternative: SkinSpriteName.LaneAlternative,
        stageLeftBorder: SkinSpriteName.StageLeftBorder,
        stageRightBorder: SkinSpriteName.StageRightBorder,

        smileHead: SkinSpriteName.NoteHeadRed,
        pureHead: SkinSpriteName.NoteHeadGreen,
        coolHead: SkinSpriteName.NoteHeadBlue,

        smileHold: SkinSpriteName.NoteConnectionRed,
        pureHold: SkinSpriteName.NoteConnectionGreen,
        coolHold: SkinSpriteName.NoteConnectionBlue,

        smileTail: SkinSpriteName.NoteTailRed,
        pureTail: SkinSpriteName.NoteTailGreen,
        coolTail: SkinSpriteName.NoteTailBlue,

        smileArrow: SkinSpriteName.DirectionalMarkerRed,
        pureArrow: SkinSpriteName.DirectionalMarkerGreen,
        coolArrow: SkinSpriteName.DirectionalMarkerBlue,

        smileSim: SkinSpriteName.SimultaneousMarkerRed,
        pureSim: SkinSpriteName.SimultaneousMarkerGreen,
        coolSim: SkinSpriteName.SimultaneousMarkerBlue,

        beatLine: SkinSpriteName.GridNeutral,
        bpmChangeLine: SkinSpriteName.GridPurple,
    },
})

export const sprites = previewData({
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

    connector: 80,

    line: 10,

    stage: 0,
}

export const line = (sprite: SkinSprite, beat: number, a: number) => {
    const pos = panel.getPos(bpmChanges.at(beat).time)

    sprite.draw(
        new Rect({
            l: -4.5,
            r: 4.5,
            b: -panel.h * 0.0025,
            t: panel.h * 0.0025,
        }).add(pos),
        layer.line,
        a,
    )
}

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000
