export const stage = levelData({
    center: Number,
    radius: Number,
})

export const sprites = levelData({
    head: SkinSpriteId,
    connector: SkinSpriteId,
    tail: SkinSpriteId,
    arrow: SkinSpriteId,
    sim: SkinSpriteId,
})

export const effects = levelData({
    hit: ParticleEffectId,
    hold: ParticleEffectId,
})
