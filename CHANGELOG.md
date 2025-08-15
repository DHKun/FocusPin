# Changelog

All notable changes to FocusPin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-08-15

### 🎨 Major Visual Redesign
#### Added
- **True Glassmorphism Design**: Complete redesign with modern frosted glass effects
- **Transparent Background**: Full application transparency showing desktop wallpaper
- **Glass Cards**: Semi-transparent white cards with backdrop blur effects
- **Custom Scrollbars**: Beautiful scrollbars that integrate perfectly with glass design
- **Enhanced Animations**: Smooth hover effects, focus states, and button feedback
- **Responsive Design**: Optimized layouts for various window sizes and resolutions

#### Changed
- **Layout**: Fixed to vertical stacking - Ideas on top, Todo on bottom (as per ui.md spec)
- **Color Scheme**: Updated to high-contrast text on semi-transparent white backgrounds
- **Typography**: Enhanced text hierarchy with better readability
- **Input Styling**: Unified input field styling across Ideas and Todo modules

### 🔧 New Functionality
#### Added
- **Pin/Unpin System**: Toggle window always-on-top behavior with 📌/📍 buttons
- **Desktop Widget Mode**: Non-intrusive window behavior that doesn't interfere with other apps
- **Window Pin Hook**: New `useWindowPin` custom hook for state management
- **Glass Card Component**: Reusable glassmorphism card component for consistent styling
- **Modern Checkbox**: Custom checkbox component with glass design integration
- **Enhanced Window Controls**: Improved title bar with Pin functionality

#### Changed
- **Window Behavior**: Default to normal window (not always-on-top) with user control
- **Ideas Input**: Changed from textarea to input for consistency with Todo module
- **Component Architecture**: Enhanced component separation and reusability

### 🚀 Performance Improvements
#### Optimized
- **Build Speed**: Reduced build time to ~560ms average
- **CSS File Size**: Optimized from ~8KB to 7.44KB
- **Bundle Size**: Improved overall application bundle optimization
- **Animation Performance**: Smoother transitions with better CSS optimization

#### Removed
- **Redundant Styles**: Eliminated duplicate and unused CSS rules
- **Conflicting Media Queries**: Removed problematic layout overrides
- **Old Scroll Styles**: Replaced with unified global scrollbar styling

### 🐛 Bug Fixes
#### Fixed
- **Layout Issues**: Fixed incorrect left-right layout that conflicted with design spec
- **Input Consistency**: Resolved styling differences between Ideas and Todo inputs
- **Scrollbar Appearance**: Fixed ugly default scrollbars with custom glass-style design
- **Window Transparency**: Resolved background opacity issues for true desktop integration
- **Text Readability**: Fixed low-contrast text on glass backgrounds

### ⚙️ Technical Changes
#### Added
- **Tauri v2 Commands**: New `set_always_on_top` Rust command for Pin functionality
- **Enhanced CSS Variables**: Comprehensive design system with glass-specific variables
- **Custom Hooks**: New React hooks for window state management
- **Glass Design System**: Structured CSS architecture for glassmorphism effects

#### Updated
- **Window Configuration**: Enhanced Tauri config for transparent window support
- **Component Props**: Updated component interfaces for better type safety
- **CSS Architecture**: Restructured styles for better maintainability and performance

#### Removed
- **Legacy Theme Support**: Removed old light/dark theme system in favor of glassmorphism
- **Unused Components**: Cleaned up components not needed for v2.0 design
- **Deprecated Styles**: Removed v1.0 styling that conflicts with new design system

### 📋 Breaking Changes
- **Layout**: Applications will now display Ideas above Todo (was previously configurable)
- **Input Types**: Ideas module now uses single-line input instead of textarea
- **Window Behavior**: Default window behavior changed from always-on-top to normal window
- **Styling**: Complete visual redesign - custom themes from v1.0 are not compatible

### 📦 Migration Guide from v1.0 to v2.0
1. **Data**: All user data (todos and ideas) is automatically migrated
2. **Pin State**: New Pin functionality - use 📌 button to control always-on-top behavior
3. **Layout**: Ideas will automatically appear above Todo section
4. **Styling**: New glassmorphism design replaces previous themes

### 🎯 Design Compliance
This release fully implements the specifications outlined in `ui.md`:
- ✅ Vertical layout with Ideas above Todo
- ✅ True glassmorphism effects with desktop background blur
- ✅ Semi-transparent white cards with proper opacity
- ✅ High-contrast text for optimal readability
- ✅ Consistent input field styling across modules
- ✅ Modern scrollbar design integrated with glass theme
- ✅ Pin/Unpin functionality for desktop widget behavior

---

## [1.0.0] - 2025-01-15

### 🎉 Initial Release
- Basic task management functionality
- Inspiration capture with textarea input
- Simple transparent design
- Always-on-top window behavior
- Local storage data persistence
- Basic drag-and-drop window movement

### Core Features
- Todo list with add/edit/delete functionality
- Ideas section for capturing inspirations
- Basic styling with semi-transparent interface
- Keyboard shortcuts for common actions
- Cross-platform desktop application built with Tauri v2

---

**Legend:**
- 🎨 Visual/UI changes
- 🔧 New features
- 🚀 Performance improvements  
- 🐛 Bug fixes
- ⚙️ Technical changes
- 📋 Breaking changes