import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const API_URL = "https://77em4-8080.sse.codesandbox.io";
const UPLOAD_ENDPOINT = "upload_files";

export default function MyEditor({ handleChange, ...props }) {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${API_URL}/${res.filename}`
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <div className="App">
       <CKEditor
        editor={ ClassicEditor }
        data=""
        config={[{placeholder: "내용을 입력하세요"}, {extraPlugins: [uploadPlugin]}]}
        onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            editor.editing.view.change((writer) => {
                writer.setStyle(
                    "height", 
                    "450px", 
                    editor.editing.view.document.getRoot()
                );
            });
            console.log( 'Editor is ready to use!', editor );
            }}
        onChange={(event, editor) => {
            handleChange(editor.getData());
            }}
        onBlur={ ( event, editor ) => {
            // console.log( 'Blur.', editor );
            }}
        onFocus={ ( event, editor ) => {
            // console.log( 'Focus.', editor );
            }}
        {...props}
    />
    </div>
  );
}
