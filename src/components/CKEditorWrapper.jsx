"use client";

import { PostProxyUrl } from "@/api/BaseUrl";
import React, { useState, useEffect, useRef } from "react";

export default function CKEditorWrapper({
  value,
  onChange,
  className,
  placeholder = "Deskripsi Tiket...",
}) {
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

  // CKEditor custom upload adapter using PostProxyUrl
  function MyUploadAdapter(loader) {
    this.loader = loader;
  }
  MyUploadAdapter.prototype.upload = function () {
    return this.loader.file.then((file) => {
      const data = new FormData();
      data.append("files", file);
      // Ganti '/upload-endpoint' sesuai endpoint API kamu
      // console.log(file);
      return new Promise(async (resolve, reject) => {
        const res = await PostProxyUrl.post("/attachments", data);
        // console.log(res.data);
        const status = res.data.success;
        if (status) {
          resolve({ default: res.data.data[0]?.url });
        } else {
          reject("Upload gagal: URL tidak ditemukan.");
        }
      });
    });
  };
  MyUploadAdapter.prototype.abort = function () {};

  function uploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  return (
    <div className={className}>
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
            "imageUpload",
          ],
          placeholder: placeholder,
          extraPlugins: [uploadAdapterPlugin],
        }}
      />
    </div>
  );
}
