export type SIFChart = {
    offset: number
    attribute: number
    objects: ChartObject[]
}

export type ChartObject = BPMObject | TapNote | SwingNote

type ObjectBase = {
    beat: number
}

export type BPMObject = ObjectBase & {
    type: 'BPM'
    bpm: number
}

type NoteBase = ObjectBase & {
    lane: number
    hold?: ObjectBase
}

export type TapNote = NoteBase & {
    type: 'Tap'
}

export type SwingNote = NoteBase & {
    type: 'Swing'
    direction: 'Left' | 'Right'
}
