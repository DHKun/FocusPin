# Wayland 下窗口置顶采取尽力而为

日期:2026-07-26

Wayland 的 xdg-shell 协议没有 keep-above,GTK 的置顶调用只在 X11 生效,因此图钉在 Wayland 会话(包括开发者自己的 KDE Plasma)下不产生效果。决定照常调用置顶 API 并保留按钮:X11 与 macOS 正常工作;Wayland 下按钮悬浮提示用 KWin 窗口规则实现真置顶(步骤在 README)。后端 WindowChrome 模块暴露 `pin_supported` 命令供前端判断。

## 备选方案

- **Wayland 下禁用按钮**:诚实,但功能在开发者自己的机器上直接消失。
- **强制 XWayland(GDK_BACKEND=x11)**:置顶立即生效,但 HiDPI 分数缩放下渲染发虚,并放弃 Wayland 原生特性,为一个按钮付出整窗代价。
