import { Attribute } from '../../../../../shared/src/engine/data/Attribute.js'
import { options } from '../../configuration/options.js'
import { panel } from '../panel.js'
import { skin, sprites } from '../skin.js'

export class Initialization extends Archetype {
    import = this.defineImport({
        attribute: { name: 'attribute', type: DataType<Attribute> },
    })

    preprocess() {
        const transform = Mat.identity
            .translate(panel.w / 2, 0)
            .scale(screen.h / 20, screen.h / panel.h)
            .translate(screen.l, screen.b)
        skin.transform.set(transform)

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
                break
            case Attribute.Cool:
                sprites.head = skin.sprites.coolHead.id
                sprites.connector = skin.sprites.coolHold.id
                sprites.tail = skin.sprites.coolTail.id
                sprites.arrow = skin.sprites.coolArrow.id
                sprites.sim = skin.sprites.coolSim.id
                break
            default:
                sprites.head = skin.sprites.smileHead.id
                sprites.connector = skin.sprites.smileHold.id
                sprites.tail = skin.sprites.smileTail.id
                sprites.arrow = skin.sprites.smileArrow.id
                sprites.sim = skin.sprites.smileSim.id
                break
        }

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

        ui.progress.set({
            anchor: uiRect.lb,
            pivot: { x: 0, y: 0 },
            size: { x: uiRect.w, y: 0.15 * ui.configuration.progress.scale },
            rotation: 0,
            alpha: ui.configuration.progress.alpha,
            background: true,
        })
    }
}
