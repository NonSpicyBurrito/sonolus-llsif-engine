import {
    EngineArchetypeDataName,
    EngineArchetypeName,
    LevelData,
    LevelDataEntity,
} from 'sonolus-core'
import { SIFC, SIFCBpmChangeObject, SIFCObject, SIFCSwingNote, SIFCTapNote } from './index.cjs'

type Intermediate = {
    archetype: string
    data: Record<string, number | Intermediate>
    sim: boolean
}

type Append = (intermediate: Intermediate) => void

type Handler<T extends SIFCObject> = (object: T, append: Append) => void

export function sifcToLevelData(chart: SIFC, offset = 0): LevelData {
    const entities: LevelDataEntity[] = []

    const beatToIntermediates = new Map<number, Intermediate[]>()

    const intermediateToRef = new Map<Intermediate, string>()
    const intermediateToEntity = new Map<Intermediate, LevelDataEntity>()

    let i = 0
    const getRef = (intermediate: Intermediate) => {
        let ref = intermediateToRef.get(intermediate)
        if (ref) return ref

        ref = (i++).toString(36)
        intermediateToRef.set(intermediate, ref)

        const entity = intermediateToEntity.get(intermediate)
        if (entity) entity.ref = ref

        return ref
    }

    const append: Append = (intermediate) => {
        const entity: LevelDataEntity = {
            archetype: intermediate.archetype,
            data: [],
        }

        if (intermediate.sim) {
            const beat = intermediate.data[EngineArchetypeDataName.Beat]
            if (typeof beat !== 'number') throw new Error('Unexpected beat')

            const intermediates = beatToIntermediates.get(beat)
            if (intermediates) {
                intermediates.push(intermediate)
            } else {
                beatToIntermediates.set(beat, [intermediate])
            }
        }

        const ref = intermediateToRef.get(intermediate)
        if (ref) entity.ref = ref

        intermediateToEntity.set(intermediate, entity)
        entities.push(entity)

        for (const [name, value] of Object.entries(intermediate.data)) {
            if (typeof value === 'number') {
                entity.data.push({
                    name,
                    value,
                })
            } else {
                entity.data.push({
                    name,
                    ref: getRef(value),
                })
            }
        }
    }

    append({
        archetype: 'Initialization',
        data: {
            attribute: chart.attribute,
        },
        sim: false,
    })
    append({
        archetype: 'InputManager',
        data: {},
        sim: false,
    })
    append({
        archetype: 'Stage',
        data: {},
        sim: false,
    })

    for (const object of chart.objects) {
        handlers[object.type](object as never, append)
    }

    for (const intermediates of beatToIntermediates.values()) {
        if (intermediates.length < 2) continue

        for (const intermediate of intermediates) {
            const entity = intermediateToEntity.get(intermediate)
            if (!entity) throw new Error('Unexpected missing entity')

            entity.data.push({
                name: 'sim',
                value: 1,
            })
        }
    }

    return {
        bgmOffset: offset,
        entities,
    }
}

const bpm: Handler<SIFCBpmChangeObject> = (object, append) => {
    append({
        archetype: EngineArchetypeName.BpmChange,
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            [EngineArchetypeDataName.Bpm]: object.bpm,
        },
        sim: false,
    })
}

const tap: Handler<SIFCTapNote> = (object, append) => {
    const note = {
        archetype: 'TapNote',
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            lane: object.lane,
        },
        sim: true,
    }

    if (object.hold) {
        hold(note, object.hold.beat, append)
    } else {
        append(note)
    }
}

const swing: Handler<SIFCSwingNote> = (object, append) => {
    const note = {
        archetype: 'SwingNote',
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            lane: object.lane,
            direction: object.direction === 'Left' ? -1 : 1,
        },
        sim: true,
    }

    if (object.hold) {
        hold(note, object.hold.beat, append)
    } else {
        append(note)
    }
}

const hold = (head: Intermediate, beat: number, append: Append) => {
    head.data.hold = 1

    const tail = {
        archetype: 'HoldNote',
        data: {
            [EngineArchetypeDataName.Beat]: beat,
            prev: head,
        },
        sim: false,
    }

    append(head)
    append(tail)
    append({
        archetype: 'HoldConnector',
        data: {
            head,
            tail,
        },
        sim: false,
    })
}

const handlers: {
    [K in SIFCObject['type']]: Handler<Extract<SIFCObject, { type: K }>>
} = {
    bpm,
    tap,
    swing,
}
