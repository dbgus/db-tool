const DEFAULT_CONFIG = [
  {
    key: 'theme',
    value: 'dark',
    category: 'view',
  },
]

import Database from '@tauri-apps/plugin-sql'
export const initConfigSetup = async (db: Database) =>
  Promise.all(
    DEFAULT_CONFIG.map(async (config) =>
      db.execute('INSERT INTO configs (key, value, category) VALUES (?, ?, ?)', [
        config.key,
        config.value,
        config.category,
      ]),
    ),
  )
