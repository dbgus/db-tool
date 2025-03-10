use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        {
            Migration {
                version: 1,
                description: "add config table",
                sql: "CREATE TABLE IF NOT EXISTS configs (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        key TEXT NOT Null,
                        value TEXT NOT null,
                        category TEXT NOT NULL
                    )",
                kind: MigrationKind::Up,
            }
        },
        {
            Migration {
                version: 1,
                description: "drop config table",
                sql: "DROP TABLE IF EXISTS configs",
                kind: MigrationKind::Down,
            }
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:local.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
