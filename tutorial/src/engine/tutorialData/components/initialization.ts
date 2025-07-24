import { hand } from '../hand.js'
import { particle } from '../particle.js'
import { skin } from '../skin.js'

export const initialization = {
    preprocess() {
        const targetAspectRatio = 1.5

        const h =
            screen.aspectRatio >= targetAspectRatio
                ? screen.h
                : (screen.h * screen.aspectRatio) / targetAspectRatio

        const t = h * 0.25
        const b = t - h * 0.625

        new Vec(0, -1)
            .rotate(Math.PI / 3)
            .mul(0.25 * ui.configuration.instruction.scale)
            .translate(0, b)
            .copyTo(hand.position)

        const transform = Mat.identity.scale(t - b, b - t).translate(0, t)
        skin.transform.set(transform)
        particle.transform.set(transform)

        const gap = 0.05
        const uiRect = screen.rect.shrink(gap, gap)

        ui.menu.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            background: true,
        })

        ui.navigation.previous.set({
            anchor: uiRect.cl,
            pivot: { x: 0, y: 0.5 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.navigation.scale),
            rotation: 0,
            alpha: ui.configuration.navigation.alpha,
            background: true,
        })
        ui.navigation.next.set({
            anchor: uiRect.cr,
            pivot: { x: 1, y: 0.5 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.navigation.scale),
            rotation: 0,
            alpha: ui.configuration.navigation.alpha,
            background: true,
        })

        ui.instruction.set({
            anchor: Vec.zero,
            pivot: { x: 0.5, y: 0.5 },
            size: new Vec(1.2, 0.15).mul(ui.configuration.instruction.scale),
            rotation: 0,
            alpha: ui.configuration.instruction.alpha,
            background: true,
        })
    },
}
