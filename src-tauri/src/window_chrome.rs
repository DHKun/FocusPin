use tauri::{AppHandle, Manager};

// 平台窗口装饰(WindowChrome):毛玻璃、置顶、任务栏行为的平台差异集中在这里,
// 前端只面对 set_pinned / pin_supported 两个命令。

// 进程级环境规避,必须在 GTK/WebKit 初始化之前调用。
// WebKitGTK 的 DMA-BUF 渲染在 NVIDIA + Wayland 组合下会以协议错误
// (Error 71) 让整个应用崩溃,改走共享内存渲染;用户已显式设置时不覆盖。
pub fn apply_env_workarounds() {
    #[cfg(target_os = "linux")]
    if std::env::var_os("WEBKIT_DISABLE_DMABUF_RENDERER").is_none() {
        std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    }
}

#[tauri::command]
pub async fn set_pinned(app: AppHandle, pinned: bool) -> Result<(), String> {
    let window = app
        .get_webview_window("main")
        .ok_or_else(|| "Window not found".to_string())?;
    // Wayland 的 xdg-shell 没有 keep-above,这个调用会被合成器忽略(尽力而为,见 ADR-0002)
    window.set_always_on_top(pinned).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn pin_supported() -> bool {
    #[cfg(target_os = "linux")]
    {
        std::env::var("XDG_SESSION_TYPE")
            .map(|session| session != "wayland")
            .unwrap_or(true)
    }
    #[cfg(not(target_os = "linux"))]
    {
        true
    }
}

// 启动时应用平台专属的窗口效果
pub fn apply(app: &mut tauri::App) {
    #[cfg(target_os = "macos")]
    {
        use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

        // skipTaskbar 在 macOS 无效:用 Accessory 策略隐藏 Dock 图标
        app.set_activation_policy(tauri::ActivationPolicy::Accessory);

        let window = app
            .get_webview_window("main")
            .expect("main window must exist");
        // 整窗系统级毛玻璃(ui.md 的视觉核心);圆角与 CSS 的 --glass-radius 一致
        if let Err(error) = apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(20.0)) {
            log::warn!("Failed to apply vibrancy: {error}");
        }
    }
    #[cfg(not(target_os = "macos"))]
    {
        // Linux/Windows 没有可从 Tauri 触达的窗口背后模糊,保持透明窗口 + 半透明卡片
        let _ = app;
    }
}
