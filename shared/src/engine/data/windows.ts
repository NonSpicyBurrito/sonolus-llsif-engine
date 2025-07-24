export type Windows = {
    perfect: Range
    great: Range
    good: Range
}

const toMs = ({ min, max }: Range) => new Range(Math.round(min * 1000), Math.round(max * 1000))

export const toBucketWindows = (windows: Windows) => ({
    perfect: toMs(windows.perfect),
    great: toMs(windows.great),
    good: toMs(windows.good),
})

const fromMs = (perfect: number, great: number, good: number) => {
    const toWindow = (ms: number) => Range.one.mul(ms / 1000)

    return {
        perfect: toWindow(perfect),
        great: toWindow(great),
        good: toWindow(good),
    }
}

export const windows = {
    tapNote: fromMs(32, 80, 128),
    holdNote: fromMs(32, 80, 128),
    swingNote: fromMs(80, 128, 224),

    minGood: -0.224,
}
