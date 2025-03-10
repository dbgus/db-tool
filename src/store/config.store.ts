import { writable } from 'svelte/store'
import type { IConfigEntity } from '../interfaces/config.interface'

export const configStore = writable<IConfigEntity[]>([])
