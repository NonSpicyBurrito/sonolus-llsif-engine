export const Attribute = {
    Smile: 0,
    Pure: 1,
    Cool: 2,
} as const

export type Attribute = (typeof Attribute)[keyof typeof Attribute]
