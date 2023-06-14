export type SIFChart = {
    attribute: number
    objects: ChartObject[]
}

export type ChartObject = BPMObject | TapNote | SwingNote

type ObjectBase = {
    beat: number
}

export type BPMObject = ObjectBase & {
    type: 'bpm'
    bpm: number
}

type NoteBase = ObjectBase & {
    lane: number
    hold?: ObjectBase
}

export type TapNote = NoteBase & {
    type: 'tap'
}

export type SwingNote = NoteBase & {
    type: 'swing'
    direction: 'Left' | 'Right'
}
