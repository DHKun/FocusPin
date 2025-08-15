use tauri::Manager;

#[tauri::command]
async fn set_always_on_top(app: tauri::AppHandle, always_on_top: bool) -> Result<(), String> {
    match app.get_webview_window("main") {
        Some(window) => {
            window.set_always_on_top(always_on_top)
                .map_err(|e| format!("Failed to set always on top: {}", e))?;
            Ok(())
        }
        None => Err("Window not found".to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![set_always_on_top])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .plugin(tauri_plugin_global_shortcut::Builder::new().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
