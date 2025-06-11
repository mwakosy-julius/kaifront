import { useEditor, EditorContent, type Content } from "@tiptap/react";
import { Toolbar } from "./Toolbar";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";
import Italic from "@tiptap/extension-italic";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Blockquote from "@tiptap/extension-blockquote";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import History from "@tiptap/extension-history";
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline'
// import BubbleMenu from '@tiptap/extension-bubble-menu'

interface TiptapProps {
  content: Content;
  setContent: (content: string | null) => void;
  editable?: boolean;
  immediatelyRender?: boolean;
}

export default function Tiptap({ content, setContent, editable = true, immediatelyRender }: TiptapProps) {
  const editor = useEditor({
    editable,
    immediatelyRender,
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      ListItem,
      Bold,
      Italic,
      Strike,
      Subscript,
      Superscript,
      Underline,
      Image,
      // BubbleMenu.configure({
      //   element: document.querySelector('.menu'),
      // }),
      History.configure({
        newGroupDelay: 500,
        depth: 100
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [2, 3, 4],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "pl-5 list-disc list-outside",
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "mt-2.5 mb-5 m-auto h-[1px] border-b border-black/50",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "pl-5 border-l-2 border-primary/80",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
            if (!ctx.defaultValidate(parsedUrl.href)) return false
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')
            if (disallowedProtocols.includes(protocol)) return false
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))
            if (!allowedProtocols.includes(protocol)) return false
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname
            if (disallowedDomains.includes(domain)) return false
            return true
          } catch { return false }
        },
        shouldAutoLink: url => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname
            return !disallowedDomains.includes(domain)
          } catch { return false }
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "editor min-h-40 w-full rounded-md bg-zinc-100 dark:bg-slate-900 p-4 ring-offset-slate-200 dark:ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-2 ring-blue-500 dark:ring-blue-500 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  return (
    <>
      <div className="sticky z-10 top-0 h-fit">
        <Toolbar editor={editor} />
      </div>
      <EditorContent editor={editor} className="min-w-full max-w-7xl" />
    </>
  );
};