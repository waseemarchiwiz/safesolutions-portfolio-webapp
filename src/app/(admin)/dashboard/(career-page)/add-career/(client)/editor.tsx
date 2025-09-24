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
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
          "checklist",
          "mediaembed",
          "casechange",
          "formatpainter",
          "pageembed",
          "a11ychecker",
          "tinymcespellchecker",
          "permanentpen",
          "powerpaste",
          "advtable",
          "advcode",
          "advtemplate",
          "ai",
          "uploadcare",
          "mentions",
          "tinycomments",
          "tableofcontents",
          "footnotes",
          "mergetags",
          "autocorrect",
          "typography",
          "inlinecss",
          "markdown",
          "importword",
          "exportword",
          "exportpdf",
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | " +
          "link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | " +
          "align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request: any, respondWith: any) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
        uploadcare_public_key: process.env.NEXT_PUBLIC_TINYMCE_UPLOAD_CARE_URL,
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
