# FocusPin 📌

![版本](https://img.shields.io/badge/version-3.0.0-blue) ![许可证](https://img.shields.io/badge/license-MIT-green) ![平台](https://img.shields.io/badge/platform-Linux%20%7C%20macOS*-lightgrey)

FocusPin 是一个桌面小组件:一块可置顶的磨砂面板,上半记灵感,下半记待办。数据存在本地文件里,没有账号,没有网络请求。

## 功能

- **Ideas / To-Do 两个分区**:输入后按 Enter 添加;悬浮条目显示编辑和删除;待办有完成态和一键清除已完成
- **深浅主题**:默认跟随系统,标题栏太阳/月亮按钮可手动固定
- **置顶(图钉)**:X11 和 macOS 下直接生效;Wayland 见下方说明
- **数据落盘**:所有内容存为 `focuspin.json`(Linux 在 `~/.local/share/com.focuspin.dev/`),旧版 localStorage 数据首次启动自动迁移
- **磨砂面板**:高不透明 tint、光泽与噪点三层合成,深浅壁纸下都可读

\* macOS 的毛玻璃(vibrancy)代码尚未在真机验证,暂不提供 macOS 安装包。

## 安装

从 [Releases](https://github.com/DHKun/FocusPin/releases/latest) 下载:

| 发行版 | 命令 |
|---|---|
| Fedora / openSUSE | `sudo dnf install ./FocusPin-3.0.0-1.x86_64.rpm` |
| Debian / Ubuntu | `sudo apt install ./FocusPin_3.0.0_amd64.deb` |
| 任意发行版 | `chmod +x FocusPin_3.0.0_amd64.AppImage && ./FocusPin_3.0.0_amd64.AppImage` |

### 从源码构建

需要 Node.js ≥ 18 和 Rust ≥ 1.77:

```bash
git clone https://github.com/DHKun/FocusPin.git
cd FocusPin
npm install
npm run tauri dev      # 开发运行
npm run tauri build    # 打包,产物在 src-tauri/target/release/bundle/
```

## 使用

- **移动窗口**:按住面板顶部拖动
- **添加**:输入框回车,或点右侧圆形加号
- **编辑**:点条目上的铅笔图标,`Enter` 保存,`Escape` 取消
- **主题**:点太阳/月亮按钮,选择会记住;想恢复跟随系统,删除数据文件里的 `theme` 键

### Linux 置顶说明(Wayland)

Wayland 会话下窗口置顶由合成器管理,应用无法自行置顶,图钉按钮悬浮时会提示。KDE Plasma 可以用窗口规则达到同样效果:

1. 系统设置 → 窗口管理 → 窗口规则 → 新建规则
2. 匹配窗口类 `FocusPin`
3. 添加属性「保持在其他窗口上方」,设为「强制」+「是」

X11 会话和 macOS 下图钉按钮直接生效。

## 故障排除

- **启动即崩溃,日志包含 `Error 71 ... Wayland display`**:WebKitGTK 的 DMA-BUF 渲染与 NVIDIA/Wayland 组合存在缺陷。应用启动时已自动设置 `WEBKIT_DISABLE_DMABUF_RENDERER=1` 规避;如需恢复 DMA-BUF 渲染,启动前把该变量显式设为 `0`
- **`Failed to load module "appmenu-gtk-module"`**:KDE 全局菜单模块缺失的无害提示,可忽略
- 其他问题请开 [Issue](https://github.com/DHKun/FocusPin/issues)

## 开发

```bash
npm run tauri dev    # 开发运行(热更新)
npm test             # vitest:Store 契约与旧数据迁移测试
npm run build        # 前端构建(含 tsc 类型检查)
npm run tauri build  # 打包桌面应用
```

### 项目结构

```
src/
├── components/        # ItemList(两卡共用)、GlassCard、WindowControls、icons 等
├── hooks/             # useWindowPin、useTheme
├── store/             # Store 接缝:schema、适配器(tauri/web/memory)、迁移、usePersistentState
└── styles/index.css   # 设计 tokens + 组件类(JSX 零内联样式)
src-tauri/
└── src/
    ├── lib.rs             # 插件与命令装配
    └── window_chrome.rs   # 平台窗口效果:置顶、vibrancy、环境规避
```

架构决定记录在 `CONTEXT.md`(领域术语)与 `docs/adr/`(含「为什么不用 localStorage」「Wayland 置顶为什么是尽力而为」)。给 AI 助手的工程约定在 `CLAUDE.md`。

欢迎提交 Issue 和 Pull Request。改动请先跑 `npm test` 和 `npm run build`。

## 许可证

MIT,详见 [LICENSE](LICENSE)。
