export const SwingDirection = {
    Left: -1,
    Right: 1,
} as const

export type SwingDirection = (typeof SwingDirection)[keyof typeof SwingDirection]
