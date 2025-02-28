import React from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";

const Proposal = ({ leadid }) => {

  const cloud = useCKEditorCloud({
    version: "44.2.1",
    premium: true,
  });

  if (cloud.status === "error") {
    return <div>Error!</div>;
  }

  if (cloud.status === "loading") {
    return <div>Loading...</div>;
  }

  const { ClassicEditor, Essentials, Paragraph, Bold, Italic,Alignment, } = cloud.CKEditor;

  const { FormatPainter } = cloud.CKEditorPremiumFeatures;

  return (
    <div style={{ width: "80%", margin: "auto", padding: "20px" }}>
      <h2>CKEditor Test</h2>
      <CKEditor
        editor={ClassicEditor}
        data={"<p>Hello world!</p>"}
        config={{
          licenseKey: "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDE5OTY3OTksImp0aSI6IjVkMGExNjI1LTlhYWUtNDUxMC04YmU4LWE1MDlhZDNiYmFlMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImI4MGYxMzEyIn0.I0zA81pk1-18TmJEqTgAMdNAGoxq1zDICCSiqzRFiNet6QiQrfuNPEQ16q7EDDvqc1ZPxUOCgLTDM6aVhFgMew",
          plugins: [Essentials, Paragraph, Bold, Italic,Alignment, FormatPainter],
          toolbar: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "|",
            "formatPainter",
          ],
        }}
      />
    </div>
  );
};

export default Proposal;
