"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import type { Editor as TinyMCEEditor } from "tinymce";

// Dynamically import React wrapper (disable SSR)
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((m) => m.Editor),
  { ssr: false }
);

type EditorClientProps = {
  initialValue?: string;
  onEditorChange?: (content: string, editor: TinyMCEEditor) => void;
};

const EditorClient: React.FC<EditorClientProps> = ({
  initialValue = "<p>Welcome to TinyMCE!</p>",
  onEditorChange,
}) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const didInit = useRef(false);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_URL}
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
      }}
      initialValue={!didInit.current ? initialValue : undefined} // ✅ only once
      onInit={(_, editor) => {
        editorRef.current = editor;
        didInit.current = true;
      }}
      onEditorChange={(content, editor) => {
        if (onEditorChange) {
          onEditorChange(content, editor);
        }
      }}
    />
  );
};

export default EditorClient;
