import { ChartObject, SIFChart } from '../sifc/index.cjs'
import { NSS, Note, NoteEffect } from './index.cjs'

export const nssToSIFC = (nss: NSS): SIFChart => {
    const objects: ChartObject[] = [
        {
            type: 'BPM',
            beat: 0,
            bpm: 60,
        },
    ]

    const swings = new Map<number, Note[]>()

    for (const note of nss) {
        const beat = note.timing_sec
        const lane = 5 - note.position

        switch (note.effect) {
            case NoteEffect.Tap1:
            case NoteEffect.Tap2:
            case NoteEffect.Tap4:
                objects.push({
                    type: 'Tap',
                    beat,
                    lane,
                })
                break
            case NoteEffect.TapHold:
                objects.push({
                    type: 'Tap',
                    beat,
                    lane,
                    hold: {
                        beat: beat + note.effect_value,
                    },
                })
                break
            case NoteEffect.Swing:
            case NoteEffect.SwingHold: {
                const notes = swings.get(note.notes_level)
                if (notes) {
                    notes.push(note)
                } else {
                    swings.set(note.notes_level, [note])
                }
                break
            }
        }
    }

    for (const notes of swings.values()) {
        for (const [i, note] of notes.entries()) {
            const beat = note.timing_sec
            const lane = 5 - note.position

            const next = notes[i + 1]
            const prev = notes[i - 1]
            const direction = next
                ? next.position > note.position
                    ? 'Left'
                    : 'Right'
                : prev
                ? prev.position > note.position
                    ? 'Right'
                    : 'Left'
                : 'Left'

            if (note.effect === NoteEffect.Swing) {
                objects.push({
                    type: 'Swing',
                    beat,
                    lane,
                    direction,
                })
            } else {
                objects.push({
                    type: 'Swing',
                    beat,
                    lane,
                    direction,
                    hold: {
                        beat: beat + note.effect_value,
                    },
                })
            }
        }
    }

    return {
        attribute: nss[0].notes_attribute - 1,
        objects,
    }
}
