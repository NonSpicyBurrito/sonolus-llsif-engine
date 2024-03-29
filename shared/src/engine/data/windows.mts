const fromMs = (perfect: number, great: number, good: number) => {
    const toWindow = (ms: number) => ({ min: -ms / 1000, max: ms / 1000 })

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
