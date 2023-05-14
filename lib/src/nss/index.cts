export type NSS = Note[]

export const NoteEffect = {
    Tap1: 1,
    Tap2: 2,
    Tap4: 4,
    TapHold: 3,
    Swing: 11,
    SwingHold: 13,
} as const

export type NoteEffect = (typeof NoteEffect)[keyof typeof NoteEffect]

export type Note = {
    timing_sec: number
    position: number
    notes_attribute: number
    notes_level: number
    effect: NoteEffect
    effect_value: number
}
