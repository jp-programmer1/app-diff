import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keep } from "@/types/keep.type";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import React, {useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export const KeepForm = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: Keep;
}) => {
  const { keeps } = useStorage((s) => ({
    keeps: s.keeps,
  }));
  const [activeEditTitle, setActiveEditTitle] = useState(false);
  const [copyData, setCopyData] = useState<Keep>(data);
  
  const [value] = useDebounce(copyData?.content, 300);

  if (!open) return null;



  useEffect(() => {
    if (keeps.length === 0) return;
  }, [open, keeps]);

  useEffect(() => {
    console.log("saving data");
    updateKeeps({
      content: value,
    }, 'content');
  }, [value]);

  const updateKeeps = useMutation(
    ({ storage }, value, key: 'content' | 'title') => {
      const newKeeps = [...keeps];
      newKeeps[keeps.findIndex((keep: Keep) => keep.id === data.id)][key] =
        value[key];
      storage.set("keeps", newKeeps);
    },
    [keeps, data]
  );

  const removeKeep = useMutation(
    ({ storage }) => {
      if (window.confirm("Are you sure you want to delete this keep?")) {
        console.log("remove keep");
        const newKeeps = [...keeps];
        newKeeps.splice(keeps.findIndex((keep: Keep) => keep.id === data.id), 1);
        storage.set("keeps", newKeeps);
        onClose();
      }
    },
    [keeps, data]
  );

  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text],
    content: data?.content || "",
    onUpdate: ({ editor }) => {
      setCopyData((current: any) => ({
        ...current,
        content: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    if (editor) {
      editor.chain().focus().run();
    }
  }, [editor]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-3xl md:max-w-7xl h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 justify-between w-[98%]">
            <DialogTitle onClick={() => setActiveEditTitle(true)}>
              {activeEditTitle ? (
                <input
                  value={data?.title}
                  onChange={(e) => {
                    updateKeeps({
                      title: e.target.value,
                    }, 'title');
                  }}
                  onBlur={() => setActiveEditTitle(false)}
                />
              ) : (
                data.title
              )}
            </DialogTitle>
            <div>
              <Button variant={"destructive"} onClick={removeKeep}>
                <Trash />
              </Button>
            </div>
          </div>
          <section></section>
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <div className="bubble-menu bg-white flex gap-2 border rounded-md p-2 text-xs">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "font-bold" : ""}
                >
                  Bold
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "font-bold" : ""}
                >
                  Italic
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive("strike") ? "font-bold" : ""}
                >
                  Strike
                </button>
              </div>
            </BubbleMenu>
          )}
          <EditorContent editor={editor} />
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center gap-2">
            <Button variant={"default"}>Cerrar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
