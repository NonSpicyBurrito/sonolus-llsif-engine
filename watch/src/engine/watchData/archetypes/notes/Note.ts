import { EngineArchetypeDataName } from '@sonolus/core'
import { toBucketWindows, Windows } from '../../../../../../shared/src/engine/data/windows.js'
import { options } from '../../../configuration/options.js'
import { effect, sfxDistance } from '../../effect.js'
import { note, noteLayout } from '../../note.js'
import { effects, hitEffectLayout, particle } from '../../particle.js'
import { getZ, layer } from '../../skin.js'

export abstract class Note extends Archetype {
    hasInput = true

    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        judgment: { name: EngineArchetypeDataName.Judgment, type: DataType<Judgment> },
        accuracy: { name: EngineArchetypeDataName.Accuracy, type: Number },
    })

    abstract windows: Windows

    abstract bucket: Bucket

    sharedMemory = this.defineSharedMemory({
        despawnTime: Number,
    })

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    initialized = this.entityMemory(Boolean)

    note = this.entityMemory({
        layout: Rect,
        z: Number,
    })

    s = this.entityMemory(Number)

    globalPreprocess() {
        this.bucket.set(toBucketWindows(this.windows))

        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.import.beat).time

        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.targetTime))

        this.sharedMemory.despawnTime = this.hitTime

        if (options.mirror) this.import.lane *= -1

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }

        this.result.time = this.targetTime

        if (!replay.isReplay) {
            this.result.bucket.index = this.bucket.index
        } else if (this.import.judgment) {
            this.result.bucket.index = this.bucket.index
            this.result.bucket.value = this.import.accuracy * 1000
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.sharedMemory.despawnTime
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.now > this.hiddenTime) return

        this.render()
    }

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
    }

    get hitTime() {
        return this.targetTime + (replay.isReplay ? this.import.accuracy : 0)
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        noteLayout(this.import.lane).copyTo(this.note.layout)
        this.note.z = getZ(layer.note.body, this.targetTime, this.import.lane)
    }

    scheduleSFX() {
        effect.clips.perfect.schedule(this.hitTime, sfxDistance)
    }

    scheduleReplaySFX() {
        if (!this.import.judgment) return

        switch (this.import.judgment) {
            case Judgment.Perfect:
                effect.clips.perfect.schedule(this.hitTime, sfxDistance)
                break
            case Judgment.Great:
                effect.clips.great.schedule(this.hitTime, sfxDistance)
                break
            case Judgment.Good:
                effect.clips.good.schedule(this.hitTime, sfxDistance)
                break
        }
    }

    render() {
        this.s = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)
    }

    despawnTerminate() {
        if (replay.isReplay && !this.import.judgment) return

        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playNoteEffect() {
        const layout = hitEffectLayout(this.import.lane)

        particle.effects.spawn(effects.hit, layout, 0.35, false)
    }
}
