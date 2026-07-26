# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FocusPin is a desktop widget built with Tauri v2, React 19, and Rust: a single pinnable frosted panel with Ideas (inspirations) on top and To-Do below. All user data lives in a local file — no accounts, no network. Current version: **3.0.0** (see CHANGELOG.md).

`CONTEXT.md` defines the project's ubiquitous language (待办/灵感/条目/Pin/Store and the terms to avoid) — follow it in code and docs.

## Architecture

### Frontend (React 19 + TypeScript, Vite)
- **State**: React hooks only; no external state library
- **Persistence**: all user data (todos, inspirations, pin state, theme) goes through the Store interface in `src/store/`; the production adapter (tauri-plugin-store) writes `focuspin.json` under the app data dir (Linux: `~/.local/share/com.focuspin.dev/`). Never touch localStorage directly — it is only a legacy migration source (see docs/adr/0001)
- **Components**:
  - `ItemList.tsx`: the single list module behind both sections; configured via props (storeKey, completable, multilineEdit, placeholder/empty/count texts)
  - `GlassCard.tsx`: legacy name — since v3 it renders a flat *section* inside the panel (small colored heading + content), not a nested card
  - `WindowControls.tsx`: top drag band with ghost buttons (theme sun/moon, pin, close)
  - `ModernCheckbox.tsx`, `TimestampDisplay.tsx`
  - `icons.tsx`: all UI icons as inline SVGs — no emoji in UI
- **Hooks**: `useWindowPin.ts` (pin state ↔ Tauri command), `useTheme.ts` (follows system by default; manual choice persisted)

### Backend (Rust / Tauri v2)
- `lib.rs`: builder wiring (plugins, commands, setup)
- `window_chrome.rs`: all platform window behavior behind two commands, `set_pinned` and `pin_supported`. macOS gets NSVisualEffectView vibrancy + Accessory activation policy (not yet verified on real hardware — no macOS packages shipped); on Wayland always-on-top is best-effort (see docs/adr/0002). Also sets `WEBKIT_DISABLE_DMABUF_RENDERER=1` to prevent the NVIDIA + Wayland startup crash
- **Window**: transparent, undecorated, normal (not always-on-top) by default; pin is user-controlled

## Development Commands

```bash
npm run dev          # Vite dev server (frontend only)
npm run tauri dev    # run the desktop app in development mode
npm run build        # type-check + build frontend
npm run tauri build  # distributable build (Linux targets: AppImage, deb, rpm)
npm test             # vitest suite: Store contract + legacy-migration tests (src/store/store.test.ts)
```

## Design System

The UI is a single frosted panel with Things-style sections inside (whitespace + small colored headings, no nested cards). Five research-backed disciplines govern any visual change (sources noted in `src/styles/index.css` comments):

1. Linux cannot blur behind the window → high-opacity panel tint, text-on-panel contrast ≥ 4.5:1
2. One material panel — never cards floating on a transparent background
3. Hierarchy = whitespace + font weight + hairlines (no drop shadows); row hover uses fill, not movement
4. One accent color per screen; focus states use a stronger hairline, not a colored glow
5. Type scale 13/12/11 px; control radius 8, panel radius 20; ~150ms motion

### Design tokens (src/styles/index.css)
The frosted look is the Acrylic fallback recipe: high-opacity tint (`--surface`) + top sheen gradient (`--sheen`) + feTurbulence noise layer (`--noise`). Key tokens:
```css
--accent: #007aff;   /* dark: #0A84FF; one accent per screen — lights up on input focus */
--amber: #e08700;    /* Ideas heading tone (dark: #FF9F0A) */
--surface: rgba(250, 250, 251, 0.86);  /* panel material; dark variant defined */
--fill: rgba(120, 120, 128, 0.1);      /* controls, row hover */
--text-primary / --text-secondary / --text-tertiary  /* label hierarchy */
```
Palettes are two token blocks: `:root` (light) and `:root[data-theme='dark']`. Theme defaults to the system preference; the titlebar sun/moon button pins it to light/dark (mode persisted in the Store under `theme`; `useTheme` always writes the resolved `data-theme` onto the root element).

### WebKitGTK rendering constraints (hard-won — do not regress)
- The panel material is painted on `#root`, which never scrolls. Never move it to `body` or any container with scrolling children — WebKitGTK's shared-memory rendering miscomposites it
- **Never set CSS `color-scheme` (or `light-dark()`, which requires it)**: WebKitGTK then paints an opaque document canvas and breaks window transparency
- Never animate `#root`: its layer cache is not invalidated on theme switch, leaving stale-paint ghosting
- `prefers-reduced-transparency` gets an opaque panel (`--surface-opaque`)

## Code Patterns

1. **Persistence via the Store seam**: components use `usePersistentState` from `src/store`; item `createdAt` is an ISO 8601 string, never a `Date` object
2. **No inline styles**: all styling lives in `src/styles/index.css` (tokens + one class per element); JSX carries class names only
3. **No hardcoded colors in components**: use `--surface`/`--fill`/text-hierarchy tokens; both palettes must stay legible on any wallpaper
4. **Layout invariant**: Ideas section above To-Do section (vertical stack)
5. **Pin state**: React hook + Tauri command; both sections share the `modern-input` styling and keyboard interactions
6. **New icons** go into `src/components/icons.tsx` as inline SVGs

## Project Structure

```
src/                 # React frontend
├── components/
│   ├── ItemList.tsx          # Shared list module (Ideas + To-Do)
│   ├── GlassCard.tsx         # Section wrapper inside the panel (legacy name)
│   ├── WindowControls.tsx    # Titlebar: drag band, theme/pin/close buttons
│   ├── ModernCheckbox.tsx    # Custom checkbox
│   ├── TimestampDisplay.tsx  # Consistent timestamp formatting
│   └── icons.tsx             # Inline SVG icons
├── hooks/
│   ├── useWindowPin.ts       # Pin state management
│   └── useTheme.ts           # Manual light/dark toggle (default: follow system)
├── store/           # Store seam: schema, adapters (tauri/web/memory), migration,
│                    # usePersistentState, store.test.ts
├── styles/
│   └── index.css             # Design tokens + all component classes
└── App.tsx          # Panel layout: WindowControls + two sections
src-tauri/           # Tauri v2 backend
├── src/
│   ├── lib.rs               # Builder wiring (plugins, commands, setup)
│   ├── window_chrome.rs     # Pin, vibrancy, activation policy, DMA-BUF workaround
│   └── main.rs              # Application entry point
├── capabilities/    # Tauri security capabilities
└── tauri.conf.json  # Window/bundle configuration
docs/adr/            # 0001 store seam over localStorage; 0002 Wayland pin best-effort
CONTEXT.md           # Ubiquitous language
CHANGELOG.md         # Detailed changelog
```

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files unless explicitly requested.
