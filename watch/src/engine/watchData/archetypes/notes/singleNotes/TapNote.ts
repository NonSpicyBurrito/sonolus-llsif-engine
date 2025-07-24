import { windows } from '../../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../../buckets.js'
import { SingleNote } from './SingleNote.js'

export class TapNote extends SingleNote {
    windows = windows.tapNote

    bucket = buckets.tapNote
}
