import { InstructionIconName, InstructionText } from 'sonolus-core'

export const instruction = defineInstruction({
    texts: {
        tap: InstructionText.Tap,
        tapAndHold: InstructionText.TapAndHold,
        release: InstructionText.Release,
        slide: InstructionText.Slide,
    },

    icons: {
        hand: InstructionIconName.Hand,
    },
})
