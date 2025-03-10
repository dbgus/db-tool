import * as R from 'ramda'
import { get, writable } from 'svelte/store'

export const isLock = writable(false)

export const queryFiled = writable<{ index: number; text: string; hasFocus: boolean }[]>([])

export const showConnectionModal = writable(false)

/**
 * Listen to the shortcut event and update the store accordingly
 */
export function setupShortcutListener() {
  window.addEventListener('keydown', (event) => {
    if (event.metaKey && event.key === 'l') {
      // lock app
      // if the app is not locked, lock it app
      if (R.not(get(isLock))) {
        isLock.update((prev) => !prev)
      }
      return
    } else if (event.metaKey && event.key === 't') {
      // new query editor tab
      queryFiled.update((prev) => [...prev, { index: prev.length, text: '', hasFocus: true }])
      return
    } else if (event.metaKey && event.key === 'w') {
      // close query editor page / data view
      queryFiled.update((prev) => prev.filter((x) => x.hasFocus))
      return
    } else if (event.metaKey && event.key === '[') {
      // focus on the previous query editor page
      queryFiled.update((prev) => {
        const index = prev.findIndex((x) => x.hasFocus)
        if (index === 0) return prev
        const newFocus = index - 1
        return prev.map((x, i) => ({ ...x, hasFocus: i === newFocus }))
      })
      return
    } else if (event.metaKey && event.key === ']') {
      // focus on the next query editor page
      queryFiled.update((prev) => {
        const index = prev.findIndex((x) => x.hasFocus)
        if (index === prev.length - 1) return prev
        const newFocus = index + 1
        return prev.map((x, i) => ({ ...x, hasFocus: i === newFocus }))
      })
      return
    } else if (event.metaKey && event.key === 'n') {
      if (R.not(get(showConnectionModal))) {
        showConnectionModal.update(() => true)
      }
    }
  })
}
