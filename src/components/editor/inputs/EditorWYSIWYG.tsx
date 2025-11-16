import type {Editor} from '@tiptap/react'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import {BaseEditorInput, type BaseEditorInputProps, baseInputClassName} from "./BaseEditorInput.tsx";

const extensions = [StarterKit]

function MenuBar({editor}: { editor: Editor }) {
  return (
    <div className="flex flex-row gap-0.5">
      <div
        className={baseInputClassName + ' cursor-pointer text-sm !p-0.5'}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </div>
      <div
        className={baseInputClassName + ' cursor-pointer text-sm !p-0.5'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </div>
    </div>
  )
}

type Props = BaseEditorInputProps & { onChange: (v: string) => void }

// TODO ul + ol
export default (props:Props ) => {
  const editor = useEditor({
    extensions,
    onUpdate: ({editor}) => {
      props.onChange(editor.getHTML())
    },
  })


  return (
    <BaseEditorInput {...props}>
      <div className="flex flex-col gap-0.5">
        <MenuBar editor={editor}/>
        <div className={baseInputClassName + " w-full"}>
          <EditorContent
            editor={editor}
            className="focus:outline-none ProseMirror min-h-[200px] text-sm"
          />
        </div>
      </div>
    </BaseEditorInput>
  )
}