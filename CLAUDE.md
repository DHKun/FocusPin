# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FocusPin is a modern desktop widget application built with Tauri v2, React 18, and Rust. It features a beautiful glassmorphism design and provides a distraction-free environment for managing tasks and capturing inspirations. **Version 2.0** introduces major UI/UX improvements with true glassmorphism effects.

## v2.0 Architecture & Key Components

### Frontend (React/TypeScript)
- **Framework**: React 18 with TypeScript
- **Design System**: Modern glassmorphism (frosted glass effects) with full transparency
- **Styling**: CSS variables with responsive design, custom scrollbars, and glass effects
- **State Management**: React hooks (useState, useEffect, useRef, useCallback)
- **Data Persistence**: localStorage for all user data (todos, inspirations, pin state)

### v2.0 Enhanced Components:
- `WindowControls.tsx`: Enhanced with Pin/Unpin functionality (📌/📍 buttons)
- `TodoList.tsx`: Unified input styling, consistent with Ideas module
- `Inspiration.tsx`: Changed from textarea to input for consistency
- `GlassCard.tsx`: Reusable glassmorphism card component
- `ModernCheckbox.tsx`: Custom checkbox with glassmorphism styling
- `TimestampDisplay.tsx`: Consistent timestamp formatting across modules
- `useWindowPin.ts`: Custom hook for window pin state management

### Backend (Rust/Tauri v2)
- **Framework**: Tauri v2 with enhanced window management
- **New Pin Functionality**: `set_always_on_top` command for desktop widget behavior
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

### Glassmorphism CSS Variables
```css
--glass-bg: rgba(255, 255, 255, 0.75);      /* Semi-transparent white cards */
--glass-border: rgba(255, 255, 255, 0.25);   /* Subtle card borders */
--glass-backdrop: blur(20px) saturate(180%); /* Backdrop filter effects */
--text-primary: #000000;                     /* High contrast text */
--text-secondary: #333333;                   /* Medium contrast text */
--text-tertiary: #666666;                    /* Low contrast text */
```

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

## v2.0 Project Structure

```
src/                 # React frontend
├── components/      # Enhanced React components
│   ├── GlassCard.tsx         # Reusable glassmorphism card
│   ├── ModernCheckbox.tsx    # Custom glass-style checkbox
│   ├── TimestampDisplay.tsx  # Consistent timestamp component
│   ├── WindowControls.tsx    # Enhanced with Pin functionality
│   ├── TodoList.tsx          # Unified input styling
│   └── Inspiration.tsx       # Changed to input consistency
├── hooks/           # Custom React hooks (new in v2.0)
│   └── useWindowPin.ts       # Pin state management hook
├── styles/          # Enhanced CSS styling
│   └── index.css             # Glassmorphism design system
└── App.tsx          # Main application component
src-tauri/           # Tauri v2 backend
├── src/             # Rust source code
│   ├── lib.rs               # Pin functionality implementation
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

### Glassmorphism Requirements
- **Background**: App background must be `transparent` 
- **Cards**: Use `rgba(255, 255, 255, 0.75)` with `backdrop-filter: blur(20px)`
- **Text**: High contrast colors (`#000000`, `#333333`, `#666666`)
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