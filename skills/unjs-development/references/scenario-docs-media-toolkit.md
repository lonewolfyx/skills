# Documentation, Content, Media, and Frontend Infrastructure Toolkit

## Scenario Definition

Use this scenario when the system centers on documentation delivery, content automation, image services, PDF utilities, head management, or interface-level presentation infrastructure.

## Recommended Toolkit Layers

| Layer | Preferred Package(s) | Responsibility |
| --- | --- | --- |
| Documentation delivery | `undocs` | Hosts documentation-oriented navigation, structure, and publishing flows. |
| Markdown automation | `automd` / `mdbox` | Maintains generated sections and reusable Markdown transforms. |
| Image pipeline | `image-meta` / `ipx` / `jimp-compact` | Separates metadata extraction, runtime image delivery, and heavier processing paths. |
| Typography and theme primitives | `fontaine` / `theme-colors` | Optimizes typography fallback behavior and design-token generation. |
| Head state | `unhead` | Centralizes SEO metadata and document-head composition. |
| Specialized media utilities | `unpdf` / `uqr` | Adds PDF and QR workflows only where explicitly required. |

## Suggested Repository Layout

```text
src/
  docs/
  content/
  media/
  head/
  theme/
```

## Implementation Sequence

1. Separate content generation from runtime rendering concerns.
1. Treat metadata extraction, transformation, and media delivery as distinct pipeline stages.
1. Keep head-management rules declarative and centralized.
1. Load heavier media utilities only for the features that need them.

## Validation Checklist

- Generated documentation blocks are idempotent.
- Image metadata, transformation, and fallback logic are clearly separated.
- Head state is not fragmented across arbitrary UI components.
- Optional media dependencies remain isolated from default runtime paths.
