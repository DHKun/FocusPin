mod window_chrome;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  window_chrome::apply_env_workarounds();

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      window_chrome::set_pinned,
      window_chrome::pin_supported
    ])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      window_chrome::apply(app);
      Ok(())
    })
    .plugin(tauri_plugin_store::Builder::default().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
