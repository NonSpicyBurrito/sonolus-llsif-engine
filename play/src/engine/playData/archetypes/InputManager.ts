import { lanes } from '../../../../../shared/src/engine/data/lanes.js'
import { stage } from '../stage.js'

const usedTouchIds = levelMemory(Collection(16, TouchId))

export const isUsed = (touch: Touch) => usedTouchIds.has(touch.id)

export const markAsUsed = (touch: Touch) => {
    usedTouchIds.add(touch.id)
}

export const transform = (position: Vec) => {
    const x = position.x
    const y = stage.center - position.y

    return {
        lane: -Math.atan2(-x, y) / lanes.angle,
        radius: Math.hypot(x, y) / stage.radius,
    }
}

export class InputManager extends SpawnableArchetype({}) {
    touch() {
        usedTouchIds.clear()
    }
}
