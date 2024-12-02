# Sonolus LLSIF Engine

A recreation of Love Live! School idol festival engine in [Sonolus](https://sonolus.com).

## Links

- [Sonolus Website](https://sonolus.com)
- [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

## Installation

```
npm install sonolus-llsif-engine
```

## Custom Resources

### Skin Sprites

| Name                      |
| ------------------------- |
| `LLSIF Connection Active` |

## Documentation

### `version`

Package version.

### `databaseEngineItem`

Partial database engine item compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `nssToSIFC(nss)`

Converts NSS (note setting asset) to SIFC (SIF Chart).

- `nss`: note setting asset.

### `sifcToLevelData(chart, offset?)`

Converts SIFC (SIF Chart) to Level Data.

- `chart`: SIF Chart.
- `offset`: offset (default: `0`).

### Assets

The following assets are exposed as package entry points:

- `EngineConfiguration`
- `EnginePlayData`
- `EngineWatchData`
- `EnginePreviewData`
- `EngineTutorialData`
- `EngineThumbnail`

In Node.js, you can obtain path to assets using `require.resolve('sonolus-llsif-engine/EngineConfiguration')` or `import.meta.resolve('sonolus-llsif-engine/EngineConfiguration')`.
