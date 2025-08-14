# FocusPin 📌

**A minimalist desktop sticky notes application for tasks and inspiration**

![Version](https://img.shields.io/badge/version-v1.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey) ![Status](https://img.shields.io/badge/status-stable-brightgreen)

FocusPin is a lightweight, always-on-top desktop application designed to help you stay focused and organized. With its clean interface and intuitive controls, it's the perfect companion for jotting down quick tasks, ideas, and inspiration without interrupting your workflow.

## ✨ Features

### 📝 Task Management
- **Quick Todo Creation**: Add tasks instantly with a simple input
- **Edit on the Fly**: Double-click any task to edit it inline
- **Easy Deletion**: Remove completed or unnecessary tasks with one click
- **Persistent Storage**: All your tasks are automatically saved locally

### 💡 Inspiration Capture
- **Idea Logging**: Capture thoughts and inspiration as they come
- **Rich Text Editing**: Full textarea support for longer notes
- **Timestamp Tracking**: Automatic timestamping for each inspiration
- **Counter Display**: See at a glance how many ideas you've captured
- **Empty State Guidance**: Helpful message when starting fresh

### 🎨 User Experience
- **Always-on-Top**: Stays visible above other applications
- **Draggable Window**: Move it anywhere on your screen
- **Transparent Design**: Clean, semi-transparent interface that blends with your desktop
- **Keyboard Shortcuts**: 
  - `Enter` to save edits
  - `Escape` to cancel edits
- **Minimalist UI**: No clutter, just what you need

## 🚀 Installation

### Prerequisites
- **Node.js**: >= 16.0.0
- **Rust**: >= 1.70 (for Tauri)
- **Package Manager**: npm, yarn, or pnpm

### From Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/DHKun/FocusPin.git
   cd FocusPin
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Install Tauri CLI** (if not already installed)
   ```bash
   cargo install tauri-cli --locked
   ```

4. **Run the development server**
   ```bash
   npm run tauri dev
   ```

### Pre-built Binaries

Coming soon! Pre-built binaries for Windows, macOS, and Linux will be available in future releases.

## 🛠️ Development

### Project Structure
```
FocusPin/
├── src/                    # Frontend React source code
│   ├── components/         # React components
│   │   ├── WindowControls.tsx
│   │   ├── TodoList.tsx
│   │   └── Inspiration.tsx
│   ├── styles/            # CSS styles
│   └── App.tsx             # Main App component
├── src-tauri/             # Tauri backend source code
│   ├── src/               # Rust source files
│   ├── tauri.conf.json   # Tauri configuration
│   └── target/            # Build artifacts
└── README.md              # This file
```

### Building for Production

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Build the Tauri application**
   ```bash
   npm run tauri build
   ```

The final binaries will be located in `src-tauri/target/release/bundle/`.

### Available Scripts

```bash
# Development
npm run tauri dev        # Start development server
npm run dev              # Start React dev server (for frontend only)

# Building
npm run build            # Build React app for production
npm run tauri build      # Build Tauri app with bundled frontend

# Testing
npm test                 # Run unit tests
npm run test:coverage    # Run tests with coverage report

# Code Quality
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint issues automatically
npm run format            # Format code with Prettier
```

## 📋 Usage Guide

### Getting Started

1. **Launch FocusPin** - The application will start as a small, draggable window
2. **Add Tasks** - Type in the input field and press Enter or click "Add"
3. **Edit Tasks** - Double-click any task to edit it inline
4. **Capture Ideas** - Use the Inspiration section to note down thoughts and creativity
5. **Stay Organized** - All your notes are automatically saved

### Tips for Productivity

- **Position Strategically**: Place FocusPin in a corner of your screen for quick access
- **Use for Brain Dumping**: Quickly capture all your thoughts at the start of the day
- **Review Regularly**: Check your tasks and inspirations throughout the day
- **Keep it Simple**: Focus on immediate tasks and ideas rather than long-term planning

## 🎯 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save Edit | `Enter` |
| Cancel Edit | `Escape` |
| Add Todo | `Enter` (in input field) |
| Delete Item | Click delete button |

## 🐛 Troubleshooting

### Common Issues

**Q: The window won't move when I try to drag it**
- A: Make sure you're clicking and dragging from the top area of the window where the controls are located

**Q: My tasks aren't being saved**
- A: FocusPin uses browser's localStorage. Make sure you have sufficient disk space and browser permissions

**Q: The app looks blurry or transparent**
- A: This is intended behavior. FocusPin uses a semi-transparent design to blend with your desktop

### Getting Help

- **Report Bugs**: Use the [GitHub Issues](https://github.com/DHKun/FocusPin/issues) page
- **Feature Requests**: We'd love to hear your ideas for improvement
- **Questions**: Check the [documentation](https://github.com/DHKun/FocusPin/wiki) or open an issue

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** (following our coding standards)
4. **Test thoroughly** (`npm run test`)
5. **Submit a pull request** with a clear description of changes

### Code Style

- **React**: Use functional components and hooks
- **TypeScript**: Prefer TypeScript for type safety
- **CSS**: Use CSS modules and avoid inline styles when possible
- **Rust**: Follow Rust conventions and use clippy for linting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tauri** - For enabling cross-platform desktop applications with web technologies
- **React** - For the powerful and flexible frontend framework
- **TypeScript** - For bringing type safety to JavaScript
- **Material Design Icons** - For the clean and intuitive iconography

## 📈 Roadmap

### v1.1 (Planned)
- [ ] Customizable themes and colors
- [ ] Keyboard shortcuts for all actions
- [ ] Data export/import functionality
- [ ] Multiple note support (tabs or windows)

### v1.2 (Future)
- [ ] Cloud synchronization
- [ ] Mobile companion app
- [ ] Advanced search and filtering
- [ ] Plugin system for extensibility

---

**FocusPin v1.0** - Stay focused, stay inspired, stay productive!

Made with ❤️ by [DoHoKun](https://github.com/DoHoKun)