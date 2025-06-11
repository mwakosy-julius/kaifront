import type { Editor } from "@tiptap/react";
import ToolbarBtn from "./ToolbarBtn";
import { Quote, List, Minus, Bold, Italic, Strikethrough, Heading2, Heading3, Heading4, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo2, Redo2, ImagePlus, Link, Subscript, Superscript, Underline } from "lucide-react";
import { useCallback } from "react";

export function Toolbar({ editor }: { editor: Editor | null }) {

  const addImage = useCallback(() => {
    if (editor) {
      const url = window.prompt('URL')
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }
  }, [editor])

  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)
      if (url === null) return
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }
      try { editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run() }
      // eslint-disable-next-line
      catch (e: any) { alert(e?.message || "Error") }
    }
  }, [editor])

  if (!editor) {
    return null
  }

  if (!editor) return null;
  return (
    <div className="mb-2 w-fit p-0.5 md:p-1 border dark:border-none rounded-md bg-zinc-100 dark:bg-slate-900 flex items-center flex-wrap gap-1">
      <ToolbarBtn
        onClick={() => editor.chain().focus().undo().run()}
        content={"Undo | Ctrl+Z"}
        editorContent={"undo"}
        editor={editor}
        disabled={!editor.can().undo()}
      >
        <Undo2 className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().redo().run()}
        content={"Redo | Ctrl+Y | Shift+Ctrl+Y"}
        editorContent={"redo"}
        editor={editor}
        disabled={!editor.can().redo()}
      >
        <Redo2 className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        content={"Heading 2 | Ctrl+Alt+2"}
        editorContent={"heading"}
        editorContentLevel={{ level: 2 }}
        editor={editor}
      >
        <Heading2 className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        content={"Heading 3 | Ctrl+Alt+3"}
        editorContent={"heading"}
        editorContentLevel={{ level: 3 }}
        editor={editor}
      >
        <Heading3 className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        content={"Heading 4 | Ctrl+Alt+4"}
        editorContent={"heading"}
        editorContentLevel={{ level: 4 }}
        editor={editor}
      >
        <Heading4 className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        content={"Bold | Ctrl+B"}
        editorContent={"bold"}
        editor={editor}
      >
        <Bold className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        content={"Underline | Ctrl+U"}
        editorContent={"underline"}
        editor={editor}
      >
        <Underline className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        content={"Italic | Ctrl+I"}
        editorContent={"italic"}
        editor={editor}
      >
        <Italic className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        content={"Subscript | Ctrl+,"}
        editorContent={"subscript"}
        editor={editor}
      >
        <Subscript className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        content={"Superscript | Ctrl+."}
        editorContent={"superscript"}
        editor={editor}
      >
        <Superscript className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        content={"Strike Through"}
        editorContent={"strike"}
        editor={editor}
      >
        <Strikethrough className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        content={"Horizontal Rule"}
        editorContent={"horizontalRule"}
        editor={editor}
      >
        <Minus className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        content={"Numbered List | Ctrl+Shift+7"}
        editorContent={"orderedList"}
        editor={editor}
      >
        <ListOrdered className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        content={"Bullet List | Ctrl+Shift+8"}
        editorContent={"bulletList"}
        editor={editor}
      >
        <List className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        content={"Blockquote | Ctrl+Shift+B"}
        editorContent={"blockquote"}
        editor={editor}
      >
        <Quote className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        content={"Text Align Left | Ctrl+Shift+L"}
        editorContent={{ textAlign: 'left' }}
        editor={editor}
      >
        <AlignLeft className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        content={"Text Align Center | Ctrl+Shift+E"}
        editorContent={{ textAlign: 'center' }}
        editor={editor}
      >
        <AlignCenter className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        content={"Text Align Right | Ctrl+Shift+R"}
        editorContent={{ textAlign: 'right' }}
        editor={editor}
      >
        <AlignRight className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        content={"Text Align Justify | Ctrl+Shift+J"}
        editorContent={{ textAlign: 'justify' }}
        editor={editor}
      >
        <AlignJustify className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => setLink()}
        content={"Add Link"}
        editorContent={"link"}
        editor={editor}
      >
        <Link className="m-auto" />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => addImage()}
        content={"Add Image"}
        editorContent={"Image"}
        editor={editor}
      >
        <ImagePlus className="m-auto" />
      </ToolbarBtn>
    </div>
  );
}
