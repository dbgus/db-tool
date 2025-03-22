import { writable } from 'svelte/store'
interface IConnection {
  driver: 'mysql' | 'postgres' | 'sqlite' | 'redis'
  host: string
  port: number
  user: string
  password: string
  database: string
}

export const connectionDrivers = writable<IConnection[]>([])
