export type SIFC = {
    attribute: number
    objects: SIFCObject[]
}

export type SIFCObject = SIFCBpmChangeObject | SIFCTapNote | SIFCSwingNote

type BaseSIFCObject = {
    beat: number
}

export type SIFCBpmChangeObject = BaseSIFCObject & {
    type: 'bpm'
    bpm: number
}

type BaseSIFCNote = BaseSIFCObject & {
    lane: number
    hold?: BaseSIFCObject
}

export type SIFCTapNote = BaseSIFCNote & {
    type: 'tap'
}

export type SIFCSwingNote = BaseSIFCNote & {
    type: 'swing'
    direction: 'Left' | 'Right'
}
