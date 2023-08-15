export type NSS = NSSNote[]

export enum NSSNoteEffect {
    Tap1 = 1,
    Tap2 = 2,
    Tap4 = 4,
    TapHold = 3,
    Swing = 11,
    SwingHold = 13,
}

export type NSSNote = {
    timing_sec: number
    position: number
    notes_attribute: number
    notes_level: number
    effect: NSSNoteEffect
    effect_value: number
}
