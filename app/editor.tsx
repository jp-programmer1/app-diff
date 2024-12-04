import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { cn } from "@/lib/utils";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useMutation, useStorage } from "@liveblocks/react/suspense";

export const Editor = () => {
  const {currentPipeline, newPipeline} = useStorage((s) => ({
    currentPipeline: s.currentPipeline,
    newPipeline: s.newPipeline,
  }));

  const updateCurrentPipeline = useMutation(({storage}, value) => {
    storage.set('currentPipeline', value);
  }, []);
  const updateNewPipeline = useMutation(({storage}, value) => {
    storage.set('newPipeline', value);
  }, []);

  const [activeCompare, setActiveCompare] = useState(false);
  return (
    <>
      {activeCompare && (
        <div className="p-4 h-[80vh] overflow-auto">
          <ReactDiffViewer
            oldValue={currentPipeline}
            newValue={newPipeline}
            splitView={true}
            styles={{
              contentText: {
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                fontSize: "12px",
              }
            }}
          />
        </div>
      )}
      <div className="grid grid-cols-2 p-4 overflow-auto">
        <div
          className={cn(
            "h-[80vh] border border-gray-400",
            activeCompare && "hidden"
          )}
        >
          <AceEditor
            mode="json"
            theme="github"
            style={{
              width: "100%",
              height: "100%",
            }}
            onChange={updateCurrentPipeline}
            value={currentPipeline}
            name="currentPipeline"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div
          className={cn(
            "h-[80vh] border border-gray-400",
            activeCompare && "hidden"
          )}
        >
          <AceEditor
            mode="json"
            theme="github"
            style={{
              width: "100%",
              height: "100%",
            }}
            onChange={updateNewPipeline}
            value={newPipeline}
            name="newPipeline"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            setActiveCompare((current) => !current);
          }}
        >
          {activeCompare ? "Nueva comparación" : "Comparar"}
        </Button>
      </div>
    </>
  );
};
