<script lang="ts">
  import axios from 'axios'
  import { onMount } from 'svelte'
  import Editor from '../components/editor.svelte'

  let data = []
  let fields: never[] = []
  async function test() {
    const response = await axios.post(
      '/api/mysql',
      {
        query: 'select * from indexer_block;',
        host: 'localhost',
        user: 'root',
        password: '1234',
        port: '3306',
        database: 'test',
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    const { result, fields: res } = response.data

    data = result
    fields = res
  }
</script>

<div class="mt-2 w-full">
  <div class="p-2">
    <Editor />
  </div>
  <button class="btn" on:click={test}>asd</button>
  <div class="overflow-x-auto">
    <table class="table table-xs">
      {#if fields.length > 0}
        <thead>
          <tr>
            {#each fields as field}
              <th>{field.name}</th>
            {/each}
          </tr>
        </thead>
      {/if}
      <tbody>
        {#if data.length > 0}
          {#each data as row, i}
            <tr>
              {#each Object.entries(row) as [key, value]}
                <td>{value}</td>
              {/each}
            </tr>
          {/each}
        {/if}
        <!-- <tr>
          <th>1</th>
          <td><input class="input input-xs" value="Cy Ganderton" /></td>
          <td><input class="input input-xs" value="Quality Control Specialist" /></td>
          <td><input class="input input-xs" value="Littel, Schaden and Vandervort" /></td>
          <td><input class="input input-xs" value="Canada" /></td>
          <td><input class="input input-xs" value="12/16/2020" /></td>
          <td><input class="input input-xs" value="Blue" /></td>
        </tr> -->
      </tbody>
    </table>
  </div>
</div>
