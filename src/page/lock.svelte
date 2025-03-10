<script lang="ts">
  import * as R from 'ramda'
  import { isLock } from '$lib/shortcuts'
  import { onMount } from 'svelte'

  // TODO get local db
  const TMP_PASSWORD = '1234'
  let password = $state('')
  let isWrong = $state(false)
  let inputRef: HTMLInputElement | undefined

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (R.equals(password, TMP_PASSWORD)) {
        password = ''
        isWrong = false
        isLock.update((v) => !v)
      } else {
        isWrong = true
      }
    }
  })
  onMount(() => {
    inputRef?.focus()
  })
</script>

<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <p class="text-center text-xl font-bold mb-4">buddy is locked!</p>
  <input
    type="password"
    placeholder="Type your password"
    class={`input ${isWrong ? 'input-error' : ''}`}
    bind:value={password}
    bind:this={inputRef}
    onblur={() => (isWrong = false)}
  />
  <p class="text-xs text-center text-gray-500 mt-2">type enter</p>
  {#if isWrong}
    <p class="text-xs text-center text-red-500 mt-2">wrong password</p>
  {/if}
</div>
