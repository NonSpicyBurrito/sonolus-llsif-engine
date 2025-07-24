import { SwingDirection } from '../../../../../shared/src/engine/data/SwingDirection.js'
import { lanes } from '../../../../../shared/src/engine/data/lanes.js'
import { options } from '../../configuration/options.js'
import { arrowLayout, note, noteLayout } from '../note.js'
import { effects, holdEffectLayout, particle } from '../particle.js'
import { getZ, layer, skin, sprites } from '../skin.js'
import { archetypes } from './index.js'

export class HoldConnector extends Archetype {
    import = this.defineImport({
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
    })

    head = this.entityMemory({
        time: Number,
        lane: Number,

        sim: Boolean,
        arrow: DataType<0 | SwingDirection>,
    })

    tail = this.entityMemory({
        time: Number,
    })

    spawnTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    connector = this.entityMemory({
        l: Vec,
        r: Vec,

        z: Number,
    })

    slide = this.entityMemory({
        layout: Rect,
        z: Number,
    })

    sim = this.entityMemory({
        z: Number,
    })

    arrow = this.entityMemory({
        layout: Quad,
        z: Number,
    })

    holdEffectInstanceId = this.entityMemory(ParticleEffectInstanceId)

    preprocess() {
        this.head.time = bpmChanges.at(this.headImport.beat).time

        this.visualTime.min = this.head.time - note.duration

        this.spawnTime = this.visualTime.min
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        this.head.lane = this.headImport.lane
        this.head.sim = this.headSingleImport.sim
        this.head.arrow =
            this.headInfo.archetype === archetypes.SwingNote.index
                ? this.headSwingImport.direction
                : 0

        this.tail.time = bpmChanges.at(this.tailImport.beat).time

        this.visualTime.max = this.tail.time

        if (options.hidden > 0) this.hiddenTime = this.tail.time - note.duration * options.hidden

        const a = -this.head.lane * lanes.angle
        const w = note.radius * options.noteSize

        new Vec(-w, 1).rotate(a).copyTo(this.connector.l)
        new Vec(w, 1).rotate(a).copyTo(this.connector.r)

        this.connector.z = getZ(layer.connector, this.head.time, this.head.lane)

        noteLayout(this.head.lane).copyTo(this.slide.layout)
        this.slide.z = getZ(layer.slide.body, this.head.time, this.head.lane)

        if (this.head.sim) this.sim.z = getZ(layer.slide.sim, this.head.time, this.head.lane)

        if (this.head.arrow) {
            arrowLayout(this.head.lane, this.head.arrow).copyTo(this.arrow.layout)
            this.arrow.z = getZ(layer.slide.body, this.head.time, this.head.lane)
        }
    }

    updateParallel() {
        if (this.isDead) {
            this.despawn = true
            return
        }

        if (this.shouldHoldEffect && !this.holdEffectInstanceId && this.isActive) {
            const layout = holdEffectLayout(this.head.lane)

            this.holdEffectInstanceId = particle.effects.spawn(effects.hold, layout, 0.6, true)
        }

        if (time.now < this.visualTime.min || time.now >= this.visualTime.max) return

        this.renderConnector()

        if (time.now < this.head.time) return

        this.renderSlide()
    }

    terminate() {
        if (this.shouldHoldEffect && this.holdEffectInstanceId)
            particle.effects.destroy(this.holdEffectInstanceId)
    }

    get headInfo() {
        return entityInfos.get(this.import.headRef)
    }

    get headImport() {
        return archetypes.TapNote.import.get(this.import.headRef)
    }

    get headSingleImport() {
        return archetypes.TapNote.singleImport.get(this.import.headRef)
    }

    get headSwingImport() {
        return archetypes.SwingNote.swingImport.get(this.import.headRef)
    }

    get headSingleSharedMemory() {
        return archetypes.TapNote.singleSharedMemory.get(this.import.headRef)
    }

    get tailInfo() {
        return entityInfos.get(this.import.tailRef)
    }

    get tailImport() {
        return archetypes.HoldNote.import.get(this.import.tailRef)
    }

    get useActiveSprite() {
        return skin.sprites.activeHold.exists
    }

    get shouldHoldEffect() {
        return options.noteEffectEnabled && particle.effects.exists(effects.hold)
    }

    get isActive() {
        return (
            this.headInfo.state === EntityState.Despawned &&
            this.headSingleSharedMemory.activatedTouchId
        )
    }

    get isDead() {
        return this.tailInfo.state === EntityState.Despawned
    }

    renderConnector() {
        if (options.hidden > 0 && time.now > this.hiddenTime) return

        const hiddenDuration = options.hidden > 0 ? note.duration * options.hidden : 0

        const visibleTime = {
            min: Math.max(this.head.time, time.now + hiddenDuration),
            max: Math.min(this.tail.time, time.now + note.duration),
        }

        const s = {
            min: Math.unlerp(visibleTime.min - note.duration, visibleTime.min, time.now),
            max: Math.unlerp(visibleTime.max - note.duration, visibleTime.max, time.now),
        }

        const l = {
            min: this.connector.l.mul(s.min),
            max: this.connector.l.mul(s.max),
        }

        const r = {
            min: this.connector.r.mul(s.min),
            max: this.connector.r.mul(s.max),
        }

        const layout = new Quad({
            p1: l.min,
            p2: l.max,
            p3: r.max,
            p4: r.min,
        })

        if (this.useActiveSprite && this.isActive) {
            const a = Math.abs(Math.sin((time.now - this.head.time) * Math.PI * 2))

            skin.sprites.activeHold.draw(layout, this.connector.z, options.connectorAlpha * a)
        } else {
            skin.sprites.draw(sprites.connector, layout, this.connector.z, options.connectorAlpha)
        }
    }

    renderSlide() {
        skin.sprites.draw(sprites.head, this.slide.layout, this.slide.z, 1)

        if (this.head.sim) skin.sprites.draw(sprites.sim, this.slide.layout, this.sim.z, 1)

        if (this.head.arrow) skin.sprites.draw(sprites.arrow, this.arrow.layout, this.arrow.z, 1)
    }
}
