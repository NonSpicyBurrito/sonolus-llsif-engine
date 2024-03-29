import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../buckets.mjs'
import { SingleNote } from './SingleNote.mjs'

export class TapNote extends SingleNote {
    windows = windows.tapNote

    bucket = buckets.tapNote
}
