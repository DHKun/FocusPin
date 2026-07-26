# 用户数据经 Store 接缝落盘,不再使用 webview localStorage

日期:2026-07-26

v2.0 之前所有用户数据存在 webview 的 localStorage 里:清理 webview 数据即丢失全部记录,存放位置随平台和 webview 实现变化,导出与测试都得绕过组件直接解析原始 JSON。现在所有持久化收拢到 `src/store` 的 Store 接口(load / save / has)后面,生产适配器用 tauri-plugin-store 把数据写成应用数据目录下的 `focuspin.json`,旧 localStorage 数据在首次启动时做幂等迁移(Store 已有该键则跳过,旧数据保留不删)。条目的 `createdAt` 统一为 ISO 8601 字符串,JSON 可直接往返,各调用方不再做日期还原。

## 备选方案

- **保留 localStorage**:实现最省事,但上面的问题原样保留。
- **状态整体搬进 Rust(SQLite/文件,前端纯视图)**:接口更小,但对当前只有两个列表的应用属于过度设计。托盘、CLI 快速记录或多窗口需求出现时再评估;届时只需给 Store 换适配器,不必推翻本决定。
