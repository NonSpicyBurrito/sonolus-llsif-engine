import { SIFC, SIFCObject } from '../sifc/index.js'
import { NSS, NSSNote, NSSNoteEffect } from './index.js'

export const nssToSIFC = (nss: NSS): SIFC => {
    const objects: SIFCObject[] = [
        {
            type: 'bpm',
            beat: 0,
            bpm: 60,
        },
    ]

    const swings = new Map<number, NSSNote[]>()

    for (const note of nss) {
        const beat = note.timing_sec
        const lane = 5 - note.position

        switch (note.effect) {
            case NSSNoteEffect.Tap1:
            case NSSNoteEffect.Tap2:
            case NSSNoteEffect.Tap4:
                objects.push({
                    type: 'tap',
                    beat,
                    lane,
                })
                break
            case NSSNoteEffect.TapHold:
                objects.push({
                    type: 'tap',
                    beat,
                    lane,
                    hold: {
                        beat: beat + note.effect_value,
                    },
                })
                break
            case NSSNoteEffect.Swing:
            case NSSNoteEffect.SwingHold: {
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
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            const direction = next
                ? next.position > note.position
                    ? 'Left'
                    : 'Right'
                : // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                  prev
                  ? prev.position > note.position
                      ? 'Right'
                      : 'Left'
                  : 'Left'

            if (note.effect === NSSNoteEffect.Swing) {
                objects.push({
                    type: 'swing',
                    beat,
                    lane,
                    direction,
                })
            } else {
                objects.push({
                    type: 'swing',
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
