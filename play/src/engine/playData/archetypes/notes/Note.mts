import { EngineArchetypeDataName } from '@sonolus/core'
import { options } from '../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../effect.mjs'
import { note, noteLayout } from '../../note.mjs'
import { effects, hitEffectLayout, particle } from '../../particle.mjs'
import { getZ, layer } from '../../skin.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
    })

    abstract windows: JudgmentWindows

    abstract bucket: Bucket

    targetTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    inputTime = this.entityMemory({
        min: Number,
        max: Number,
    })

    note = this.entityMemory({
        layout: Rect,
        z: Number,
    })

    s = this.entityMemory(Number)

    globalPreprocess() {
        const toMs = ({ min, max }: RangeLike) => ({
            min: Math.round(min * 1000),
            max: Math.round(max * 1000),
        })

        this.bucket.set({
            perfect: toMs(this.windows.perfect),
            great: toMs(this.windows.great),
            good: toMs(this.windows.good),
        })

        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.import.beat).time

        this.visualTime.max = this.targetTime
        this.visualTime.min = this.visualTime.max - note.duration

        this.inputTime.min = this.targetTime + this.windows.good.min + input.offset

        this.spawnTime = Math.min(this.visualTime.min, this.inputTime.min)

        if (options.mirror) this.import.lane *= -1

        if (this.shouldScheduleSFX) this.scheduleSFX()
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        this.inputTime.max = this.targetTime + this.windows.good.max + input.offset

        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - note.duration * options.hidden

        noteLayout(this.import.lane).copyTo(this.note.layout)
        this.note.z = getZ(layer.note.body, this.targetTime, this.import.lane)

        this.result.accuracy = this.windows.good.max
    }

    touchOrder = 1

    updateParallel() {
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (time.now < this.visualTime.min) return
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        this.render()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && options.autoSFX
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoSFX
    }

    scheduleSFX() {
        effect.clips.perfect.schedule(this.targetTime, sfxDistance)
    }

    render() {
        this.s = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)
    }

    playSFX() {
        switch (this.result.judgment) {
            case Judgment.Perfect:
                effect.clips.perfect.play(sfxDistance)
                break
            case Judgment.Great:
                effect.clips.great.play(sfxDistance)
                break
            case Judgment.Good:
                effect.clips.good.play(sfxDistance)
                break
        }
    }

    playHitEffects() {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playNoteEffect() {
        const layout = hitEffectLayout(this.import.lane)

        particle.effects.spawn(effects.hit, layout, 0.35, false)
    }
}
