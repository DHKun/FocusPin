# FocusPin 📌

**现代化玻璃拟态桌面小组件**

![版本](https://img.shields.io/badge/version-v2.0-blue) ![许可证](https://img.shields.io/badge/license-MIT-green) ![平台](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey) ![状态](https://img.shields.io/badge/status-stable-brightgreen)

FocusPin 是一款优雅的桌面小组件应用程序，采用现代化的玻璃拟态（Glassmorphism）设计风格。它是您保持专注和有条理完成任务的完美伴侣，提供无干扰的桌面体验。

## ✨ v2.0 新特性

### 🎨 现代化设计升级
- **真正的玻璃拟态效果**：半透明白色卡片，桌面背景模糊效果
- **完美的布局**：Ideas在上，Todo在下的垂直布局设计
- **统一的用户界面**：输入框样式完全统一，视觉体验一致
- **美化的滚动条**：与玻璃设计完美融合的自定义滚动条
- **完全透明背景**：真正的桌面小组件体验，依赖桌面壁纸

### 🔧 功能改进
- **Pin/Unpin功能**：可控制窗口置顶状态，真正的桌面小组件行为
- **优化的窗口管理**：不再干扰其他应用，支持桌面小组件模式
- **增强的交互动画**：流畅的悬浮效果、焦点状态和按钮反馈
- **响应式布局**：完美适配各种窗口尺寸和分辨率

### 🚀 性能优化
- **更快的构建速度**：构建时间优化至~560ms
- **更小的文件大小**：CSS优化至7.44KB，提升加载速度
- **更好的兼容性**：跨平台玻璃效果支持和降级方案

## 📝 核心功能

### 💡 Ideas模块
- **快速灵感记录**：简洁的单行输入，快速捕捉想法
- **即时编辑**：双击任何想法即可进行内联编辑
- **时间戳跟踪**：自动为每条灵感添加创建时间
- **持久化存储**：所有想法自动保存在本地

### ✅ To-Do模块
- **任务管理**：通过简单输入即时添加待办事项
- **状态跟踪**：完整的任务完成状态管理
- **批量操作**：支持批量完成和删除任务
- **智能排序**：新任务自动排列，已完成任务区分显示

### 🎨 用户体验
- **桌面小组件模式**：可选的置顶显示，不干扰正常工作
- **拖拽窗口**：可自由移动到屏幕任意位置
- **键盘快捷键**：
  - `Enter` 保存编辑/添加项目
  - `Escape` 取消编辑
  - `Ctrl+Shift+F` 全局快捷键显示/隐藏窗口
- **极简界面**：纯净的玻璃拟态设计，零干扰体验

## 🚀 安装

### 预编译安装包 (推荐)

下载最新的v2.0版本：
- **Windows**: `FocusPin_2.0.0_x64-setup.exe` 或 `FocusPin_2.0.0_x64_en-US.msi`
- **macOS & Linux**: 即将发布

### 从源码安装

#### 先决条件
- **Node.js**: >= 16.0.0
- **Rust**: >= 1.70 (用于 Tauri v2)
- **包管理器**: npm、yarn 或 pnpm

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
│   │   ├── WindowControls.tsx      # 窗口控制和Pin功能
│   │   ├── TodoList.tsx            # 任务管理组件
│   │   ├── Inspiration.tsx         # 灵感记录组件
│   │   ├── GlassCard.tsx           # 玻璃卡片组件
│   │   ├── ModernCheckbox.tsx      # 现代复选框组件
│   │   └── TimestampDisplay.tsx    # 时间戳显示组件
│   ├── hooks/                      # 自定义Hook
│   │   └── useWindowPin.ts         # Pin状态管理Hook
│   ├── styles/            # CSS样式 (玻璃拟态设计)
│   │   └── index.css      # 主样式文件
│   └── App.tsx             # 主App组件
├── src-tauri/             # Tauri v2 后端源代码
│   ├── src/               # Rust源文件
│   │   ├── lib.rs         # Pin功能Rust实现
│   │   └── main.rs        # 主程序入口
│   ├── tauri.conf.json   # Tauri v2配置 (透明窗口)
│   └── target/            # 构建产物
├── ui.md                  # UI设计规范文档
├── CLAUDE.md              # AI助手配置文档
├── CHANGELOG.md           # v2.0更新日志
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
| 添加Ideas/Todo | `Enter` (在输入框中) |
| 显示/隐藏窗口 | `Ctrl+Shift+F` (全局) |
| Pin/Unpin窗口 | 点击📌按钮 |
| 删除项目 | 点击删除按钮 |

## 🐛 故障排除

### 常见问题

**问：Pin按钮不工作或窗口行为异常**
- 答：请确保您使用的是最新的v2.0版本，旧版本不支持Pin功能

**问：玻璃效果不显示或看起来不对**
- 答：玻璃拟态效果依赖系统支持。在不支持的系统上会自动降级为兼容模式

**问：窗口布局是左右排列而不是上下排列**
- 答：确保窗口高度足够。在极小窗口下，布局可能会调整

**问：滚动条样式异常**
- 答：v2.0采用了新的滚动条设计。如有问题，请尝试重新安装应用

**问：我的数据没有被保存**
- 答：FocusPin使用localStorage保存数据。请确保有足够磁盘空间和浏览器权限

### v1.0升级到v2.0注意事项

- **数据兼容性**：v2.0完全兼容v1.0的数据，升级后数据会自动迁移
- **新功能**：Pin功能需要重新学习使用，📌按钮控制窗口置顶
- **界面变化**：新的玻璃拟态设计可能需要适应期

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

- **Tauri v2** - 现代化的跨平台桌面应用框架，支持透明窗口
- **React 18** - 强大而灵活的前端框架
- **TypeScript** - 为JavaScript带来类型安全
- **Glassmorphism** - 现代化的玻璃拟态设计理念

---

**FocusPin v2.0** - 现代化玻璃拟态设计，完美的桌面小组件体验！

由 [DoHoKun](https://github.com/DoHoKun) ❤️ 制作