<script lang="ts">
  import { showConnectionModal, showNewConnectionModal } from '$lib/shortcuts'
</script>

<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <div class="bg-gray-100 w-96 text-black rounded-sm p-1">
    <div class="pb-4 pt-2">
      <span>new connection</span>
    </div>
    <div class="h-96 overflow-auto border-t-2 border-gray-200">
      <div class="flex pt-2 cursor-pointer hover:bg-gray-200 p-2 border-b-2 border-gray-200">
        <div class="w-11 h-11 bg-amber-300 rounded-full flex items-center justify-center">
          <span class="text-xs">mysql</span>
        </div>
        <div class="ml-4">
          <p class="text-sm">alias</p>
          <p class="text-sm">127.0.0.1:3306 : test</p>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-2">
      <button
        class="btn btn-xs mx-1 btn-success"
        on:click={() => {
          showNewConnectionModal.update(() => true)
          showConnectionModal.update(() => false)
        }}>new</button
      >
      <button
        class="btn btn-xs mx-1"
        on:click={() => {
          showConnectionModal.update(() => false)
        }}>cancel</button
      >
    </div>
  </div>
</div>
