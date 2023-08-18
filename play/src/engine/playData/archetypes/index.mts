import { HoldConnector } from './HoldConnector.mjs'
import { Initialization } from './Initialization.mjs'
import { InputManager } from './InputManager.mjs'
import { Stage } from './Stage.mjs'
import { HoldNote } from './notes/HoldNote.mjs'
import { SwingNote } from './notes/singleNotes/SwingNote.mjs'
import { TapNote } from './notes/singleNotes/TapNote.mjs'

export const archetypes = defineArchetypes({
    Initialization,
    InputManager,

    Stage,

    TapNote,
    SwingNote,
    HoldNote,

    HoldConnector,
})
