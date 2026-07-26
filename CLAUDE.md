# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FocusPin is a modern desktop widget application built with Tauri v2, React 19, and Rust. It features a beautiful glassmorphism design and provides a distraction-free environment for managing tasks and capturing inspirations. **Version 2.0** introduces major UI/UX improvements with true glassmorphism effects.

## v2.0 Architecture & Key Components

### Frontend (React/TypeScript)
- **Framework**: React 19 with TypeScript
- **Design System**: Modern glassmorphism (frosted glass effects) with full transparency
- **Styling**: CSS variables with responsive design, custom scrollbars, and glass effects
- **State Management**: React hooks (useState, useEffect, useRef, useCallback)
- **Data Persistence**: all user data (todos, inspirations, pin state) goes through the Store interface in `src/store/`; the production adapter (tauri-plugin-store) writes `focuspin.json` under the app data dir. Never touch localStorage directly — it is only a legacy migration source (see docs/adr/0001).

### v2.0 Enhanced Components:
- `WindowControls.tsx`: Enhanced with Pin/Unpin functionality (📌/📍 buttons)
- `ItemList.tsx`: shared list module behind both the Ideas and To-Do cards; configured via props (storeKey, completable, multilineEdit, texts)
- `GlassCard.tsx`: Reusable glassmorphism card component
- `ModernCheckbox.tsx`: Custom checkbox with glassmorphism styling
- `TimestampDisplay.tsx`: Consistent timestamp formatting across modules
- `useWindowPin.ts`: Custom hook for window pin state management

### Backend (Rust/Tauri v2)
- **Framework**: Tauri v2 with enhanced window management
- **WindowChrome module** (`src-tauri/src/window_chrome.rs`): platform window behavior behind two commands, `set_pinned` and `pin_supported`. macOS gets NSVisualEffectView vibrancy + Accessory activation policy; on Wayland always-on-top is best-effort (see docs/adr/0002)
- **Window Configuration**: 
  - Transparent windows for true glassmorphism
  - Optional always-on-top (controlled by user)
  - Desktop widget mode (non-intrusive by default)
- **Security**: Enhanced CSP and capabilities for v2.0

## Development Commands

### Development
```bash
npm run dev
```
Starts the development server with hot reloading.

### Building
```bash
npm run build
```
Builds the frontend application.

```bash
npm run tauri build
```
Builds the complete Tauri desktop application for distribution.

### Testing
```bash
npm test
```
Runs the vitest suite (Store contract tests and legacy-data migration tests in `src/store/store.test.ts`).

### Tauri Development
```bash
npm run tauri dev
```
Runs the Tauri application in development mode.

## v2.0 Key Features

1. **Glassmorphism Design**: True transparent background with frosted glass cards
2. **Pin/Unpin System**: User-controlled always-on-top window behavior  
3. **Desktop Widget Mode**: Non-intrusive operation, perfect desktop integration
4. **Unified Input Styling**: Consistent input fields across Ideas and Todo modules
5. **Custom Scrollbars**: Beautiful scrollbars integrated with glass design
6. **Vertical Layout**: Ideas on top, Todo on bottom (as per ui.md specification)
7. **Enhanced Animations**: Smooth hover effects, focus states, and transitions
8. **Responsive Design**: Optimized layouts for various window sizes
9. **Performance Optimized**: Faster builds (~560ms) and smaller CSS footprint

## v2.0 Design System

### Design tokens (src/styles/index.css)
The UI is a single frosted panel with Things-style sections inside (whitespace + small colored headings, no nested cards). Linux cannot blur behind the window, so the frosted look is the Acrylic fallback recipe: high-opacity tint (`--surface`, ~0.94) + top sheen gradient (`--sheen`) + feTurbulence noise layer (`--noise`). Key tokens:
```css
--accent: #007aff;   /* dark: #0A84FF; one accent per screen — lights up on input focus */
--amber: #e08700;    /* Ideas heading tone (dark: #FF9F0A) */
--surface: rgba(250, 250, 251, 0.86);  /* panel material; dark variant defined */
--fill: rgba(120, 120, 128, 0.1);      /* controls, row hover */
--text-primary / --text-secondary / --text-tertiary  /* label hierarchy */
```
Palettes are two token blocks: `:root` (light) and `:root[data-theme='dark']`. Theme defaults to the system preference; the titlebar sun/moon button pins it to light/dark (mode persisted in the Store under `theme`; `useTheme` always writes the resolved `data-theme` onto the root element). **Never set CSS `color-scheme` (or `light-dark()`, which requires it)**: WebKitGTK then paints an opaque document canvas and breaks window transparency. `prefers-reduced-transparency` gets an opaque panel. Icons are inline SVGs in `src/components/icons.tsx` — no emoji in UI.

### Layout Requirements
- **Critical**: Ideas section MUST be above Todo section (vertical stack)
- **Transparency**: App background must be fully transparent
- **Glass Cards**: All content cards use glassmorphism styling
- **Input Consistency**: Both modules use identical input field styling

## Code Patterns

1. **Glassmorphism Styling**: All UI elements follow consistent glass design principles
2. **Pin State Management**: Window always-on-top controlled via React hook + Tauri command
3. **Transparent Background**: Full app transparency for desktop widget experience  
4. **Unified Components**: Consistent styling across Ideas and Todo inputs
5. **CSS Variables**: Extensive use of custom properties for maintainable styling
6. **Responsive Behavior**: Proper media queries for different window sizes
7. **Persistence via the Store seam**: components use `usePersistentState` from `src/store`; item `createdAt` is an ISO 8601 string, never a `Date` object
8. **No inline styles**: all styling lives in `src/styles/index.css` (tokens + one class per element); JSX carries class names only

## v2.0 Project Structure

```
src/                 # React frontend
├── components/      # Enhanced React components
│   ├── GlassCard.tsx         # Reusable glassmorphism card
│   ├── ModernCheckbox.tsx    # Custom glass-style checkbox
│   ├── TimestampDisplay.tsx  # Consistent timestamp component
│   ├── WindowControls.tsx    # Enhanced with Pin functionality
│   └── ItemList.tsx          # Shared list module (Ideas + To-Do)
├── hooks/           # Custom React hooks
│   ├── useWindowPin.ts       # Pin state management hook
│   └── useTheme.ts           # Manual light/dark toggle (default: follow system)
├── store/           # Store seam: schema, adapters (tauri/web/memory), migration, usePersistentState
├── styles/          # Enhanced CSS styling
│   └── index.css             # Glassmorphism design system
└── App.tsx          # Main application component
src-tauri/           # Tauri v2 backend
├── src/             # Rust source code
│   ├── lib.rs               # Builder wiring (plugins, commands, setup)
│   ├── window_chrome.rs     # Platform window effects: pin, vibrancy, activation policy
│   └── main.rs              # Application entry point
├── capabilities/    # Enhanced Tauri security capabilities
├── icons/           # Application icons
└── tauri.conf.json  # Enhanced v2 configuration
ui.md                # Design specification (glassmorphism)
CHANGELOG.md         # v2.0 detailed changelog
CLAUDE.md            # This file (updated for v2.0)
```

## v2.0 Critical Implementation Notes

### Window Behavior Changes
- **Default State**: Normal desktop window (not always-on-top)
- **Pin Mode**: User can toggle always-on-top via 📌 button in title bar
- **Transparency**: Full application background transparency for desktop integration
- **Widget Mode**: True desktop widget experience without interfering with other apps

### Material Requirements
- **Background**: the window is transparent; the `.app` panel carries the material (`--surface`)
- **Surfaces**: use `--surface`/`--fill` tokens; never hardcode colors in components
- **Text**: three-level label hierarchy via tokens; both light and dark palettes must stay legible on any wallpaper
- **Layout**: Vertical stacking - Ideas above, Todo below

### Input Field Consistency
- Both Ideas and Todo modules use identical `modern-input` class
- Same styling: padding, border, background, transitions
- Unified placeholder text style and keyboard interactions

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files unless explicitly requested.