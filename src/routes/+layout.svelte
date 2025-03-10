<script lang="ts">
  import '../index.css'

  import Database from '@tauri-apps/plugin-sql'

  import * as R from 'ramda'

  import { configStore } from '../store/config.store'
  import type { IConfigEntity } from '../interfaces/config.interface'
  import { initConfigSetup } from '../util/init-config-setup'
  import Header from '../components/header.svelte'
  import { onMount } from 'svelte'
  import { isLock, setupShortcutListener, showConnectionModal } from '../lib/shortcuts'
  import Lock from '../page/lock.svelte'
  import LeftSideDrawer from '../components/leftSideDrawer.svelte'
  import Connection from '../components/connection.svelte'

  // get config
  const getInitConfig = async () => {
    const db = await Database.load('sqlite:local.db')
    const configs = await db.select<IConfigEntity[]>('SELECT * FROM configs')

    if (R.isEmpty(configs)) {
      await initConfigSetup(db)
    } else {
      configStore.set(configs)
    }
  }
  // setup shortcut listener
  onMount(() => {
    setupShortcutListener()
  })
  let { children } = $props()
</script>

<main class="">
  {#await getInitConfig()}
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span class="loading loading-spinner loading-xl"></span>
    </div>
  {:then}
    {#if $isLock}
      <Lock />
    {:else}
      <Header />
      <div class="flex">
        <LeftSideDrawer />
        {@render children()}
      </div>
      {#if $showConnectionModal}
        <div class="fixed inset-0 bg-black opacity-30 flex items-center justify-center w-full">
          <Connection />
        </div>
      {/if}
    {/if}
  {/await}
</main>
