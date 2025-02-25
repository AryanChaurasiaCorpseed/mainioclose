import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Proposal = ({ leadid }) => {
  const [content, setContent] = useState("");


  return (
    <div style={{ width: "80%", margin: "auto", padding: "20px" }}>
      <h2>CKEditor Test</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Start typing...</p>"
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}
      />
    </div>
  );
};

export default Proposal;
