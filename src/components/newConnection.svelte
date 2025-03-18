<script lang="ts">
  import { showNewConnectionModal } from '$lib/shortcuts'
</script>

<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <div class="bg-gray-100 w-96 text-black rounded-sm p-1">
    <div class="pb-4 pt-2">asdsadasdasd</div>
    <div class="ml-4">
      <input class="input input-sm text-white" placeholder="alias" />
      <input class="input input-sm text-white" placeholder="host" />
      <input class="input input-sm text-white" placeholder="port" />
      <input class="input input-sm text-white" placeholder="user" />
      <input class="input input-sm text-white" placeholder="password" />
      <input class="input input-sm text-white" placeholder="database" />
    </div>
    <div class="flex justify-end mt-2">
      <button class="btn btn-xs mx-1 btn-success">save</button>
      <button
        class="btn btn-xs mx-1"
        on:click={() => {
          showNewConnectionModal.update(() => false)
        }}>cancel</button
      >
    </div>
  </div>
</div>
