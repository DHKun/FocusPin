# FocusPin 📌

**一款极简桌面便签应用**

![版本](https://img.shields.io/badge/version-v1.0-blue) ![许可证](https://img.shields.io/badge/license-MIT-green) ![平台](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey) ![状态](https://img.shields.io/badge/status-stable-brightgreen)

FocusPin 是一款轻量级的桌面应用程序，旨在帮助您保持专注和有条理的完成任务。凭借其简洁且直观的 UI，它是在不中断工作流程的情况下快速记下任务、想法和灵感的完美伴侣。

## ✨ 功能

### 📝 任务管理
- **快速创建待办事项**：通过简单的输入即时添加任务
- **即时编辑**：双击任何任务即可进行内联编辑
- **轻松删除**：一键删除已完成或不必要的任务
- **持久化存储**：您的所有任务都会自动保存在本地

### 💡 灵感捕捉
- **想法记录**：随时捕捉思绪和灵感
- **富文本编辑**：完全支持文本区域，可记录更长的笔记
- **时间戳跟踪**：为每条灵感自动添加时间戳
- **计数器显示**：一目了然地看到您捕捉了多少个想法
- **空状态指引**：在您重新开始时提供有用的提示信息

### 🎨 用户体验
- **可拖动窗口**：可以将其移动到屏幕上的任何位置
- **透明设计**：干净、半透明的界面，与您的桌面融为一体
- **键盘快捷键**：
  - `Enter` 保存编辑
  - `Escape` 取消编辑
- **极简用户界面**：没有杂乱的东西，只有您需要的功能

## 🚀 安装

### 先决条件
- **Node.js**：>= 16.0.0
- **Rust**：>= 1.70 (用于 Tauri)
- **包管理器**：npm、yarn 或 pnpm

### 从源码安装

1.  **克隆仓库**
    ```bash
    git clone https://github.com/DHKun/FocusPin.git
    cd FocusPin
    ```

2.  **安装前端依赖**
    ```bash
    npm install
    # 或
    yarn install
    # 或
    pnpm install
    ```

3.  **安装 Tauri CLI** (如果尚未安装)
    ```bash
    cargo install tauri-cli --locked
    ```

4.  **运行开发服务器**
    ```bash
    npm run tauri dev
    ```

### 预编译二进制文件

即将推出！适用于 Windows、macOS 和 Linux 的预编译二进制文件将在未来的版本中提供。

## 🛠️ 开发

### 项目结构
```
FocusPin/
├── src/                    # 前端 React 源代码
│   ├── components/         # React 组件
│   │   ├── WindowControls.tsx
│   │   ├── TodoList.tsx
│   │   └── Inspiration.tsx
│   ├── styles/            # CSS 样式
│   └── App.tsx             # 主 App 组件
├── src-tauri/             # Tauri 后端源代码
│   ├── src/               # Rust 源文件
│   ├── tauri.conf.json   # Tauri 配置
│   └── target/            # 构建产物
└── README.md              # 本文件
```

### 构建生产版本

1.  **构建前端**
    ```bash
    npm run build
    ```

2.  **构建 Tauri 应用程序**
    ```bash
    npm run tauri build
    ```

最终的二进制文件将位于 `src-tauri/target/release/bundle/`。

### 可用脚本

```bash
# 开发
npm run tauri dev        # 启动开发服务器
npm run dev              # 启动 React 开发服务器 (仅前端)

# 构建
npm run build            # 构建生产环境的 React 应用
npm run tauri build      # 构建包含前端的 Tauri 应用

# 测试
npm test                 # 运行单元测试
npm run test:coverage    # 运行带覆盖率报告的测试

# 代码质量
npm run lint              # 运行 ESLint
npm run lint:fix          # 自动修复 ESLint 问题
npm run format            # 使用 Prettier 格式化代码
```

## 📋 使用指南

### 入门

1.  **启动 FocusPin** - 应用程序将以一个可拖动的小窗口启动
2.  **添加任务** - 在输入框中输入内容，然后按 Enter 或点击“添加”
3.  **编辑任务** - 双击任何任务进行内联编辑
4.  **捕捉想法** - 使用灵感部分记下想法和创意
5.  **保持条理** - 您的所有笔记都会自动保存

### 提高效率的技巧

- **策略性放置**：将 FocusPin 放置在屏幕一角，以便快速访问
- **用于头脑风暴**：在一天的开始，快速捕捉所有想法
- **定期回顾**：全天检查您的任务和灵感

## 🎯 键盘快捷键

| 操作 | 快捷键 |
|--------|----------|
| 保存编辑 | `Enter` |
| 取消编辑 | `Escape` |
| 添加待办 | `Enter` (在输入框中) |
| 删除项目 | 点击删除按钮 |

## 🐛 故障排除

### 常见问题

**问：当我尝试拖动窗口时，它不动**
- 答：请确保您是从窗口顶部的控件区域点击并拖动的

**问：我的任务没有被保存**
- 答：FocusPin 使用浏览器的 localStorage。请确保您有足够的磁盘空间和浏览器权限

**问：应用程序看起来模糊或透明**
- 答：这是预期的行为。FocusPin 采用半透明设计，以与您的桌面融为一体

### 获取帮助

- **报告错误**：使用 [GitHub Issues](https://github.com/DHKun/FocusPin/issues) 页面
- **功能请求**：我们很乐意听到您的改进建议
- **提问**：查看[文档](https://github.com/DHKun/FocusPin/wiki)或提交一个 issue

## 🤝 贡献

我们欢迎任何贡献！请参阅我们的[贡献指南](CONTRIBUTING.md)以获取详细信息。

### 开发工作流程

1.  **Fork 本仓库**
2.  **创建一个功能分支** (`git checkout -b feature/amazing-feature`)
3.  **进行更改** (遵循我们的编码标准)
4.  **充分测试** (`npm run test`)
5.  **提交一个拉取请求** (Pull Request)，并附上清晰的更改说明

### 代码风格

- **React**：使用函数式组件和 Hooks
- **TypeScript**：为了类型安全，首选 TypeScript
- **CSS**：使用 CSS 模块，并尽可能避免内联样式
- **Rust**：遵循 Rust 约定并使用 clippy 进行代码检查

## 📄 许可证

本项目根据 MIT 许可证授权 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- **Tauri** - 使得用 Web 技术构建跨平台桌面应用成为可能
- **React** - 强大而灵活的前端框架
- **TypeScript** - 为 JavaScript 带来了类型安全
- **Material Design Icons** - 提供了简洁直观的图标

---

**FocusPin v1.0** - 保持专注，保持灵感，保持高效！

由 [DoHoKun](https://github.com/DoHoKun) ❤️ 制作