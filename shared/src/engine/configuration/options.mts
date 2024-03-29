import { EngineConfigurationOption, NameText, UnitText } from 'sonolus-core'

export const optionsDefinition = {
    speed: {
        name: NameText.LevelSpeed,
        standard: true,
        advanced: true,
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    hidden: {
        name: NameText.Hidden,
        standard: true,
        advanced: true,
        type: 'slider',
        def: 0,
        min: 0,
        max: 1,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    noteSpeed: {
        name: NameText.NoteSpeed,
        scope: 'LLSIF',
        type: 'slider',
        def: 9,
        min: 1,
        max: 11,
        step: 0.1,
    },
    attribute: {
        name: 'Attribute',
        scope: 'LLSIF',
        type: 'select',
        def: 0,
        values: ['Original', 'Smile', 'Pure', 'Cool'] as string[],
    },
    mirror: {
        name: NameText.MirrorLevel,
        type: 'toggle',
        def: 0,
    },
    sfxEnabled: {
        name: NameText.SFX,
        scope: 'LLSIF',
        type: 'toggle',
        def: 1,
    },
    autoSFX: {
        name: NameText.AutoSFX,
        scope: 'LLSIF',
        type: 'toggle',
        def: 0,
    },
    noteSize: {
        name: NameText.NoteSize,
        scope: 'LLSIF',
        type: 'slider',
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    noteEffectEnabled: {
        name: NameText.NoteEffect,
        scope: 'LLSIF',
        type: 'toggle',
        def: 1,
    },
    noteEffectSize: {
        name: NameText.NoteEffectSize,
        scope: 'LLSIF',
        type: 'slider',
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    connectorAlpha: {
        name: NameText.ConnectorTransparency,
        scope: 'LLSIF',
        type: 'slider',
        def: 0.5,
        min: 0.1,
        max: 1,
        step: 0.05,
        unit: UnitText.Percentage,
    },
} satisfies Record<string, EngineConfigurationOption>
