import { EngineArchetypeName } from '@sonolus/core'
import { BpmChange } from './BpmChange.js'
import { HoldConnector } from './HoldConnector.js'
import { Initialization } from './Initialization.js'
import { Stage } from './Stage.js'
import { HoldNote } from './notes/HoldNote.js'
import { SwingNote } from './notes/singleNotes/SwingNote.js'
import { TapNote } from './notes/singleNotes/TapNote.js'

export const archetypes = defineArchetypes({
    Initialization,

    [EngineArchetypeName.BpmChange]: BpmChange,

    Stage,

    TapNote,
    SwingNote,
    HoldNote,

    HoldConnector,
})
