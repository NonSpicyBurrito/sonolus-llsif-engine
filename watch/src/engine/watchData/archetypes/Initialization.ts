import { Attribute } from '../../../../../shared/src/engine/data/Attribute.js'
import { options } from '../../configuration/options.js'
import { effects, particle } from '../particle.js'
import { skin, sprites } from '../skin.js'
import { archetypes } from './index.js'

export class Initialization extends Archetype {
    import = this.defineImport({
        attribute: { name: 'attribute', type: DataType<Attribute> },
    })

    preprocess() {
        const targetAspectRatio = 1.5

        const h =
            screen.aspectRatio >= targetAspectRatio
                ? screen.h
                : (screen.h * screen.aspectRatio) / targetAspectRatio

        const t = h * 0.25
        const b = t - h * 0.625

        const transform = Mat.identity.scale(t - b, b - t).translate(0, t)
        skin.transform.set(transform)
        particle.transform.set(transform)

        switch (options.attribute) {
            case 1:
                this.import.attribute = Attribute.Smile
                break
            case 2:
                this.import.attribute = Attribute.Pure
                break
            case 3:
                this.import.attribute = Attribute.Cool
                break
        }

        switch (this.import.attribute) {
            case Attribute.Pure:
                sprites.head = skin.sprites.pureHead.id
                sprites.connector = skin.sprites.pureHold.id
                sprites.tail = skin.sprites.pureTail.id
                sprites.arrow = skin.sprites.pureArrow.id
                sprites.sim = skin.sprites.pureSim.id

                effects.hit = particle.effects.pureHit.id
                effects.hold = particle.effects.pureHold.id
                break
            case Attribute.Cool:
                sprites.head = skin.sprites.coolHead.id
                sprites.connector = skin.sprites.coolHold.id
                sprites.tail = skin.sprites.coolTail.id
                sprites.arrow = skin.sprites.coolArrow.id
                sprites.sim = skin.sprites.coolSim.id

                effects.hit = particle.effects.coolHit.id
                effects.hold = particle.effects.coolHold.id
                break
            default:
                sprites.head = skin.sprites.smileHead.id
                sprites.connector = skin.sprites.smileHold.id
                sprites.tail = skin.sprites.smileTail.id
                sprites.arrow = skin.sprites.smileArrow.id
                sprites.sim = skin.sprites.smileSim.id

                effects.hit = particle.effects.smileHit.id
                effects.hold = particle.effects.smileHold.id
                break
        }

        score.base.set({
            perfect: 1,
            great: 0.88,
            good: 0.8,
        })
        score.consecutive.great.set({
            multiplier: 0.05,
            step: 100,
            cap: 800,
        })

        const gap = 0.05
        const uiRect = screen.rect.shrink(gap, gap)

        ui.menu.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.metric.primary.bar.set({
            anchor: uiRect.lt,
            pivot: { x: 0, y: 1 },
            size: {
                x: uiRect.w - 0.05 - 0.15 * ui.configuration.menu.scale,
                y: 0.15 * ui.configuration.metric.primary.scale,
            },
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.primary.value.set({
            anchor: uiRect.lt.add(new Vec(0.15, -0.035).mul(ui.configuration.metric.primary.scale)),
            pivot: { x: 0, y: 1 },
            size: {
                x:
                    uiRect.w -
                    0.05 -
                    0.15 * ui.configuration.menu.scale -
                    0.175 * ui.configuration.metric.primary.scale,
                y: 0.08 * ui.configuration.metric.primary.scale,
            },
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        ui.combo.value.set({
            anchor: { x: -0.05, y: Math.lerp(t, b, 0.25) },
            pivot: { x: 1, y: 0.5 },
            size: new Vec(0, (t - b) * 0.1).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })
        ui.combo.text.set({
            anchor: { x: 0, y: Math.lerp(t, b, 0.25) },
            pivot: { x: 0, y: 0.5 },
            size: new Vec(0, (t - b) * 0.065).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: false,
        })

        ui.judgment.set({
            anchor: { x: 0, y: Math.lerp(t, b, 0.4) },
            pivot: { x: 0.5, y: 0.5 },
            size: new Vec(0, (t - b) * 0.15).mul(ui.configuration.judgment.scale),
            rotation: 0,
            alpha: ui.configuration.judgment.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        ui.progress.set({
            anchor: uiRect.lb,
            pivot: { x: 0, y: 0 },
            size: { x: uiRect.w, y: 0.15 * ui.configuration.progress.scale },
            rotation: 0,
            alpha: ui.configuration.progress.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        for (const archetype of Object.values(archetypes)) {
            if (!('globalPreprocess' in archetype)) continue

            archetype.globalPreprocess()
        }
    }
}
