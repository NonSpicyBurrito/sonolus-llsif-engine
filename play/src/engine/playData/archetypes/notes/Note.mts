import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../effect.mjs'
import { layer } from '../../layer.mjs'
import { effects, particle } from '../../particle.mjs'
import { getScheduleSFXTime, getZ, hitEffectLayout, noteLayout } from '../../utils.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
    })

    abstract windows: JudgmentWindows

    abstract bucket: Bucket

    targetTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    scheduleSFXTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    hasSFXScheduled = this.entityMemory(Boolean)

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
        const toMs = ({ min, max }: JudgmentWindow) => ({
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
        this.targetTime = bpmChanges.at(this.data.beat).time

        this.visualTime.max = this.targetTime
        this.visualTime.min = this.visualTime.max - this.duration

        this.scheduleSFXTime = getScheduleSFXTime(this.targetTime)

        this.spawnTime = Math.min(this.visualTime.min, this.scheduleSFXTime)

        if (options.mirror) this.data.lane *= -1
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        this.inputTime.min = this.targetTime + this.windows.good.min + input.offset
        this.inputTime.max = this.targetTime + this.windows.good.max + input.offset

        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - this.duration * options.hidden

        noteLayout(this.data.lane).copyTo(this.note.layout)
        this.note.z = getZ(layer.note.body, this.targetTime, this.data.lane)

        if (options.autoplay) {
            this.result.judgment = Judgment.Perfect

            this.result.bucket.index = this.bucket.index
        } else {
            this.result.accuracy = this.windows.good.max
        }
    }

    touchOrder = 1

    updateParallel() {
        if (options.autoplay && time.now >= this.targetTime) this.despawn = true
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (this.shouldScheduleSFX && !this.hasSFXScheduled && time.now >= this.scheduleSFXTime)
            this.scheduleSFX()

        if (time.now < this.visualTime.min) return
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return
        if (!this.shouldRender) return

        this.render()
    }

    terminate() {
        if (!options.autoplay) return

        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && (options.autoplay || options.autoSFX)
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoplay && !options.autoSFX
    }

    scheduleSFX() {
        this.hasSFXScheduled = true

        effect.clips.perfect.schedule(this.targetTime, sfxDistance)
    }

    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get shouldRender() {
        return true
    }

    render() {
        this.s = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)
    }

    playSFX() {
        if (this.result.judgment === Judgment.Perfect) {
            effect.clips.perfect.play(sfxDistance)
        } else if (this.result.judgment === Judgment.Great) {
            effect.clips.great.play(sfxDistance)
        } else if (this.result.judgment === Judgment.Good) {
            effect.clips.good.play(sfxDistance)
        }
    }

    playHitEffects() {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playNoteEffect() {
        const layout = hitEffectLayout(this.data.lane)

        particle.effects.spawn(effects.hit, layout, 0.35, false)
    }

    get duration() {
        return options.noteSpeed >= 6
            ? 1.6 - options.noteSpeed * 0.1
            : 1.9 - options.noteSpeed * 0.15
    }
}
