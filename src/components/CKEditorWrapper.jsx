"use client";

import React, { useState, useEffect, useRef } from "react";

export default function CKEditorWrapper({ value, onChange }) {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const loadEditor = async () => {
      if (typeof window !== "undefined" && editorRef.current && !editor) {
        try {
          const { CKEditor } = await import("@ckeditor/ckeditor5-react");
          const ClassicEditor = await import(
            "@ckeditor/ckeditor5-build-classic"
          );

          setEditor({ CKEditor, ClassicEditor: ClassicEditor.default });
        } catch (error) {
          console.error("Gagal memuat CKEditor:", error);
        }
      }
    };

    loadEditor();
  }, [editor]);

  if (!editor) {
    return (
      <div ref={editorRef}>
        <p>Memuat editor...</p>
      </div>
    );
  }

  return (
    <div>
      <editor.CKEditor
        editor={editor.ClassicEditor}
        data={value}
        onChange={(event, editorInstance) => {
          const data = editorInstance.getData();
          onChange(data);
        }}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
          placeholder: "Deskripsi Tiket...",
        }}
      />
    </div>
  );
}
