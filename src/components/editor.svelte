<script lang="ts">
  import { onMount } from 'svelte'
  import type { editor as TEditor } from 'monaco-editor'
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

  let subscriptions: any[] = []
  let content

  let divEl: HTMLElement
  let editor: TEditor.IStandaloneCodeEditor
  let Monaco: typeof import('monaco-editor')
  let decorationsCollection: TEditor.IEditorDecorationsCollection | null = null // 새로운 방식

  onMount(() => {
    const initializeEditor = async () => {
      self.MonacoEnvironment = {
        getWorker: (_moduleId: string, label: string) => new editorWorker(),
      }
      Monaco = await import('monaco-editor')
      editor = Monaco.editor.create(divEl, {
        value: '',
        language: 'sql',
        theme: 'vs-dark',
        readOnly: false,
        minimap: {
          enabled: false,
        },
      })

      decorationsCollection = editor.createDecorationsCollection([])

      editor.onDidChangeModelContent(() => {
        const text = editor.getValue()
        subscriptions.forEach((sub) => sub(text))
      })

      editor.onDidChangeCursorPosition(() => {
        highlightCurrentSql()
      })

      content = {
        subscribe(func: any) {
          subscriptions.push(func)
          return () => {
            subscriptions = subscriptions.filter((sub) => sub != func)
          }
        },
        set(val: any) {
          editor.setValue(val)
        },
      }
    }

    initializeEditor()

    return () => {
      editor.dispose()
    }
  })

  // 현재 포커스된 SQL 블록 찾기
  function getCurrentSqlBlock() {
    const position = editor.getPosition()
    const model = editor.getModel()
    if (!position || !model) return null

    const lines = model.getLinesContent()
    let startLine = position.lineNumber - 1
    let endLine = position.lineNumber - 1

    // 위로 올라가며 세미콜론을 찾음
    while (startLine > 0 && !lines[startLine - 1].trim().endsWith(';')) {
      startLine--
    }
    // 아래로 내려가며 세미콜론을 찾음
    while (endLine < lines.length - 1 && !lines[endLine].trim().endsWith(';')) {
      endLine++
    }

    return { startLine, endLine }
  }

  function highlightCurrentSql() {
    const sqlBlock = getCurrentSqlBlock()
    if (!sqlBlock || !decorationsCollection) return

    const { startLine, endLine } = sqlBlock

    decorationsCollection.set([
      {
        range: new Monaco.Range(startLine + 1, 1, endLine + 1, Number.MAX_SAFE_INTEGER), // 끝까지 확장
        options: {
          isWholeLine: true,
          inlineClassName: 'highlighted-sql', // 클래스 추가
        },
      },
    ])
  }
</script>

<div class="h-96 w-full">
  <div bind:this={divEl} class="h-full w-full"></div>
</div>

<svelte:window
  on:resize={() => {
    editor.layout({ width: 0, height: 0 })
    window.requestAnimationFrame(() => {
      if (!divEl.parentElement) return
      const rect = divEl.parentElement.getBoundingClientRect()
      editor.layout({ width: rect.width, height: rect.height })
    })
  }}
/>
