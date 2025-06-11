import type { Editor } from "@tiptap/react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip"
import { Toggle } from "../../ui/toggle";
import { cn } from "@/lib/utils";

interface ToolbarBtnProps {
  content: string | React.ReactNode;
  editorContent: string | { textAlign: 'left' | 'right' | 'center' | 'justify' };
  editorContentLevel?: { level: number };
  editor: Editor | null;
  onClick: () => void;
  children: React.ReactNode | string;
  disabled?: boolean
}

export default function ToolbarBtn(props: ToolbarBtnProps) {
  const {
    onClick,
    editor,
    children,
    content,
    editorContent,
    editorContentLevel,
    disabled = undefined
  } = props;

  if (!editor) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        {disabled !== undefined ? (
          <TooltipTrigger asChild>
            <Button
              onClick={onClick}
              className={cn(`cursor-pointer transition h-8 min-w-8 lg:h-9 lg:min-w-9 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white shadow-none`)}
              disabled={disabled}
            >
              {children}
            </Button>
          </TooltipTrigger>
        ) : (
          <TooltipTrigger asChild>
            {editorContentLevel && typeof editorContent === "string" ? (
              <Toggle
                onPressedChange={onClick}
                pressed={editor.isActive(editorContent, editorContentLevel)}
                className={cn(`cursor-pointer transition h-8 min-w-8 lg:h-9 lg:min-w-9`, { "bg-blue-500 text-white": editor.isActive(editorContent, editorContentLevel) })}
              >
                {children}
              </Toggle>
            ) : (
              <Toggle
                onPressedChange={onClick}
                pressed={editor.isActive(editorContent)}
                className={cn(`cursor-pointer transition h-8 min-w-8 lg:h-9 lg:min-w-9`, { "bg-blue-500 text-white": editor.isActive(editorContent) })}
              >
                {children}
              </Toggle>
            )}
          </TooltipTrigger>
        )}
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};